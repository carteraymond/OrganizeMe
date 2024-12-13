import { Response } from 'express';
import { AuthRequest } from './authController';

async function loadHomePage(req: AuthRequest, res: Response): Promise<void> {
  // Security check to prevent unauthorized access to home page
    if (!req.session.user) {
      console.error('User not authenticated');
    res.redirect('/auth');
    return;
    }

    res.render('home', {
    title: 'Home',
    user: req.session.user
    });
    console.log('User authenticated');
}

export { loadHomePage };