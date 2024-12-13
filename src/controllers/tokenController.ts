import { RequestHandler } from 'express';
import User from '../models/user';
import { AuthRequest } from './authController';

export const createToken: RequestHandler = async (req, res, next) => {
   // Get session data
    const userReq = req as AuthRequest;
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Token name is required' });
        return;
    }

   // Check if session and user exist
    if (!userReq.session?.user?.id) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        // Find user by GH ID
        const user = await User.findOne({ githubId: userReq.session.user.id.toString() });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const token = user.generateApiToken(name);
        await user.save();

        res.status(201).json({
            message: 'API token created successfully',
            token,
            name
        });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ error: 'Failed to create API token' });
    }
};

// return token name, creation date, and last used date for all
export const listTokens: RequestHandler = async (req, res, next) => {
    const userReq = req as AuthRequest;

    if (!userReq.session?.user?.id) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const user = await User.findOne({ githubId: userReq.session.user.id.toString() });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

       // Remove the token value for security
        const tokens = user.apiTokens.map(token => ({
            name: token.name,
            createdAt: token.createdAt,
            lastUsed: token.lastUsed
        }));

        res.json({ tokens });
    } catch (error) {
        console.error('Error listing tokens:', error);
        res.status(500).json({ error: 'Failed to list API tokens' });
    }
};

// uses token name
export const deleteToken: RequestHandler = async (req, res, next) => {
    const userReq = req as AuthRequest;
    const { name } = req.params;

    if (!userReq.session?.user?.id) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const user = await User.findOne({ githubId: userReq.session.user.id.toString() });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const tokenIndex = user.apiTokens.findIndex(t => t.name === name);
        if (tokenIndex === -1) {
            res.status(404).json({ error: 'Token not found' });
            return;
        }

        user.apiTokens.splice(tokenIndex, 1);
        await user.save();

        res.json({ message: 'Token deleted successfully' });
    } catch (error) {
        console.error('Error deleting token:', error);
        res.status(500).json({ error: 'Failed to delete API token' });
    }
};