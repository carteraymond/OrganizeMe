import { Response } from 'express';
import { AuthRequest } from './authController';

async function loadHomePage(req: AuthRequest, res: Response): Promise<void> {
  console.log(`Session ID: ${req.sessionID}`);
  console.log(`session Log: ${JSON.stringify(req.session.user)} Also, this is inside LoadHomePage`);
  // Security check to prevent unauthorized access to home page
    if (!req.session.user) {
      console.log('User not authenticated');
    res.redirect('/auth');
    return;
    }
    console.log('User authenticated');
    res.render('home', {
    title: 'Home',
    user: req.session.user
    });
    
}

export { loadHomePage };