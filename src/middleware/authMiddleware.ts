import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from '../controllers/authController';
import User from '../models/user';

export const requireAuth: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userReq = req as AuthRequest;

    if (!userReq.session || !userReq.session.user) {
        res.redirect('/auth');
        return;
    }

    next();
};

export const requireAuthAPI: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userReq = req as AuthRequest;

    // First check for API token in header
    const authHeader = req.headers.authorization;
    // Make sure the header exists and starts with 'Bearer ' (the api token type)
    // idk if this is really necessary, but the dude on stackoverflow said to do it
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Skip the first 7 characters ('Bearer ')
        try {
            // Find user by token
            const user = await User.findOne({ 'apiTokens.token': token });
            if (user) {
                // Update last used timestamp
                await User.updateOne(
                    { 'apiTokens.token': token },
                    { $set: { 'apiTokens.$.lastUsed': new Date() } }
                );
                
                // Add user to request object
                (req as any).user = {
                    id: user.githubId,
                    name: user.displayName
                };
                // Continue middleware stack
                next();
                return;
            }
        } catch (error) {
            console.error('Token verification error:', error);
        }
    }

    // Check session for browser API calls
    if (userReq.session?.user) {
        next();
        return;
    }

    // No valid auth method found
    res.status(401).json({
        error: 'Authentication required',
        message: 'Please provide a valid API token or session'
    });
};