import express, { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { Session } from 'express-session';

// Load environment variables early to fail fast if required OAuth configs are missing
dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Extended types ensure type safety when dealing with session data
interface SessionUser {
  id: number;
  name: string;
  email?: string;
}

interface CustomSession extends Session {
  user?: SessionUser;
}

interface CustomRequest extends Request {
  session: CustomSession;
}

// Partial type allowing for GitHub's variable user response format
interface UserInfo {
  id: number;
  name?: string;
  login: string;    // Fallback when name isn't available
  email?: string;
}

async function loadSignInPage(req: Request, res: Response): Promise<void> {
  // Scope limited to user:email to follow principle of least privilege
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
  res.render('signin', {
    title: 'Sign In To Continue',
    githubAuthUrl,
  });
}

async function auth(req: CustomRequest, res: Response): Promise<void> {
  const { code } = req.query;
  if (!code) {
    console.error('No code received from GitHub');
    res.status(400).send('No code received from GitHub');
    return;
  }

  // Debug logs ----------------------------------------
  // console.log('Received GitHub code:', code);
  // console.log('Using CLIENT_ID:', CLIENT_ID);
  // console.log('Using REDIRECT_URI:', REDIRECT_URI);
  // Debug logs ----------------------------------------

  try {
    // Exchange code for access token using JSON format for cleaner parsing
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

    // Debug logs ----------------------------------------
    // console.log('Token response:', tokenResponse.data);
    // Debug logs ----------------------------------------

    const access_token = tokenResponse.data.access_token;
    
    // Early token validation prevents unnecessary API calls
    if (!access_token) {
      console.error('No access token in response:', tokenResponse.data);
      throw new Error('No access token received from GitHub');
    }

    // Fetch user details once we have valid token
    const userInfoResponse: AxiosResponse<UserInfo> = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    });

    const userInfo = userInfoResponse.data;

    // Debug logs ----------------------------------------
    console.log('User info received:', userInfo);
    // Debug logs ----------------------------------------

    // Store minimal user data in session for future requests
    req.session.user = {
      id: userInfo.id,
      name: userInfo.name || userInfo.login,  // Fallback to login if name isn't set
      email: userInfo.email,
    };

    res.redirect('/home');
    return;
  } catch (error) {
    // Structured error logging helps debug OAuth issues
    console.error('Detailed authentication error:', {
      message: (error as AxiosError).message ?? 'Unknown error',
      response: (error as AxiosError).response
        ? {
            status: (error as AxiosError).response?.status ?? 'unknown',
            data: (error as AxiosError).response?.data ?? null,
          }
        : 'No response',
      config: (() => {
        const axiosConfig = (error as AxiosError).config;
        if (axiosConfig) {
          return {
            url: axiosConfig.url ?? 'unknown',
            method: axiosConfig.method ?? 'unknown',
            headers: axiosConfig.headers ?? {},
          };
        }
        return 'No config';
      })(),
    });
    res.status(500).send(`Authentication failed: ${(error as Error).message}`);
    return;
  }
}


export { loadSignInPage, auth, CustomRequest };