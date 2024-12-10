import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../controllers/authController';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    
    if (!customReq.session || !customReq.session.user) {
        console.log('Unauthorized access attempt - redirecting to auth');
        return res.status(401).json({
            error: 'Authentication required',
            redirect: '/auth'
        });
    }
    
    next();
};

// Use this for API routes that should return 401 without redirect
export const requireAuthAPI = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    
    if (!customReq.session || !customReq.session.user) {
        console.log('Unauthorized API access attempt');
        return res.status(401).json({
            error: 'Authentication required'
        });
    }
    
    next();
};