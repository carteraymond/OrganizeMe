import express, { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

interface UserInfo {
  id: number;
  name?: string;
  login: string;
  email?: string;
}

async function loadSignInPage(req: Request, res: Response): Promise<void> {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
  res.render('signin', {
    title: 'Sign In To Continue',
    githubAuthUrl,
  });
}

async function auth(req: Request, res: Response): Promise<void> {
  const { code } = req.query;

  if (!code) {
    console.error('No code received from GitHub');
    return res.status(400).send('No code received from GitHub');
  }

  console.log('Received GitHub code:', code);
  console.log('Using CLIENT_ID:', CLIENT_ID);
  console.log('Using REDIRECT_URI:', REDIRECT_URI);

  try {
    const tokenResponse: AxiosResponse<{ access_token: string }> = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      },
    });

    console.log('Token response:', tokenResponse.data);

    const access_token = tokenResponse.data.access_token;

    if (!access_token) {
      console.error('No access token in response:', tokenResponse.data);
      throw new Error('No access token received from GitHub');
    }

    const userInfoResponse: AxiosResponse<UserInfo> = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    });

    const userInfo = userInfoResponse.data;
    console.log('User info received:', userInfo);

    req.session.user = {
      id: userInfo.id,
      name: userInfo.name || userInfo.login,
      email: userInfo.email,
    };

    res.redirect('/home');
  } catch (error) {
    console.error('Detailed authentication error:', {
      message: (error as AxiosError).message,
      response: (error as AxiosError).response
        ? {
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
          }
        : 'No response',
      config: (error as AxiosError).config
        ? {
            url: (error as AxiosError).config.url,
            method: (error as AxiosError).config.method,
            headers: (error as AxiosError).config.headers,
          }
        : 'No config',
    });
    res.status(500).send(`Authentication failed: ${(error as Error).message}`);
  }
}
export { loadSignInPage, auth };