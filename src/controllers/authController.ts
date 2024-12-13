import express, { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { Session } from 'express-session';
import User from '../models/user';

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Sets how the user info will be stored in the session
interface SessionUser {
  id: number;
  name: string;
  email?: string;
}

// Add user info to express's built-in session interface
interface AuthSession extends Session {
  user?: SessionUser;
}

// Add custom type to Request interface so TS doesn't yell at me
interface AuthRequest extends Request {
  session: AuthSession;
}

// Defines the structure of info received from GitHub
interface UserInfo {
  id: number;
  name?: string;
  login: string;
  email?: string;
  avatar_url?: string;
}

async function loadSignInPage(req: Request, res: Response): Promise<void> {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
  res.render('signin', {
    title: 'Sign In To Continue',
    githubAuthUrl,
  });
}

async function createOrUpdateUser(userInfo: UserInfo) {
  try {
    // Try to find existing user by githubId
    let user = await User.findOne({ githubId: userInfo.id.toString() });

    if (!user) {
      // Create new user if not found
      user = new User({
        githubId: userInfo.id.toString(),
        username: userInfo.login,
        displayName: userInfo.name || userInfo.login,
        profileImgUrl: userInfo.avatar_url,
        email: userInfo.email
      });
      await user.save();
      console.log('New user created:', user);
    } else {
      // Update existing user's information
      user.username = userInfo.login;
      user.displayName = userInfo.name || userInfo.login;
      user.profileImgUrl = userInfo.avatar_url;
      user.email = userInfo.email;
      await user.save();
      console.log('Existing user updated:', user);
    }
    return user;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}

async function auth(req: AuthRequest, res: Response): Promise<void> {
  const { code } = req.query;
  if (!code) {
    console.error('No code received from GitHub');
    res.status(400).send('No code received from GitHub');
    return;
  }

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

    const access_token = tokenResponse.data.access_token;
    
    if (!access_token) {
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
    
    // Create or update user in database
    const user = await createOrUpdateUser(userInfo);

    // Store user data in session
    req.session.user = {
      id: userInfo.id,
      name: userInfo.name || userInfo.login,
      email: userInfo.email,
    };

    res.redirect('/home');
    return;
  } catch (error) {
    console.error('Authentication error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    res.status(500).send(`Authentication failed: ${(error as Error).message}`);
    return;
  }
}

export { loadSignInPage, auth, AuthRequest };