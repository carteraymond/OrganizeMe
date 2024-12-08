import { Response } from 'express';
import { CustomRequest } from './authController';

async function loadHomePage(req: CustomRequest, res: Response): Promise<void> {
  // Security check to prevent unauthorized access to home page
    if (!req.session.user) {
    res.redirect('/auth');
    return;
    }

    res.render('home', {
    title: 'Home',
    user: req.session.user
    });
}

export { loadHomePage };