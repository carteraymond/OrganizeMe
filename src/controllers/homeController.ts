import { Response } from 'express';
import { AuthRequest } from './authController';

async function loadHomePage(req: AuthRequest, res: Response): Promise<void> {
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