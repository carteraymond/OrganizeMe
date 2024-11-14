import express from 'express';
import { Request, Response } from 'express';
import { loadSignInPage, auth } from '../controllers/authController';

const authRouter = express.Router();

authRouter.get('/', loadSignInPage);

authRouter.get('/github', (req: Request, res: Response) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user:email`;
  res.redirect(githubAuthUrl);
});

authRouter.get('/github/callback', auth);


export default authRouter;