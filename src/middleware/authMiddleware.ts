import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomRequest } from '../controllers/authController';

export const requireAuth: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const customReq = req as CustomRequest;

    if (!customReq.session || !customReq.session.user) {
        console.log('Unauthorized access attempt - redirecting to auth');
        res.status(401).json({
            error: 'Authentication required',
            redirect: '/auth'
        });
        return;
    }

    next();
};

export const requireAuthAPI: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const customReq = req as CustomRequest;

    if (!customReq.session || !customReq.session.user) {
        console.log('Unauthorized API access attempt');
        res.status(401).json({
            error: 'Authentication required'
        });
        return;
    }

    next();
};