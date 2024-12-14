import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './authController';
import { 
    updateUserProfile, 
    deleteUserAccount, 
    getUserProfile, 
    getAllUserProfiles,
    updateCanvasToken,
    createUserProfile
} from '../services/userService';

interface CreateUserRequest extends Request {
    body: {
        githubId: string;
        username: string;
        displayName: string;
        email?: string;
        profileImgUrl?: string;
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export const createUser = async (
    req: CreateUserRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userData = req.body;

        // Validate required fields
        if (!userData.githubId || !userData.username || !userData.displayName) {
            res.status(400).json({
                success: false,
                error: 'Missing required fields: githubId, username, and displayName are required'
            });
            return;
        }

        // Validate GitHub ID format
        if (!/^\d+$/.test(userData.githubId)) {
            res.status(400).json({
                success: false,
                error: 'Invalid GitHub ID format'
            });
            return;
        }

        // Validate email format if provided
        if (userData.email && !isValidEmail(userData.email)) {
            res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
            return;
        }
            
        // Validate URL format for profile image if provided
        if (userData.profileImgUrl && !isValidUrl(userData.profileImgUrl)) {
            res.status(400).json({
                success: false,
                error: 'Invalid profile image URL format'
            });
            return;
        }

        // Create user
        const user = await createUserProfile(userData);

        res.status(201).json({
            success: true,
            data: user
        });

    } catch (error) {
        // Handle specific errors
        if (error instanceof Error && error.message === 'User with this GitHub ID already exists') {
            res.status(409).json({
                success: false,
                error: 'User with this GitHub ID already exists'
            });
            return;
        }

        // Log the error for debugging
        console.error('Error in createUser:', error);

        // Pass error to Express error handler
        next(error);
    }
};

const getUserId = (req: Request): string | null => {
    // If using API token auth
    if ((req as any).user?.githubId) {
        return (req as any).user.githubId;
    }
    // If using session auth
    const userReq = req as AuthRequest;
    return userReq.session?.user?.id?.toString() || null;
};

// Get Current User Profile
export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = getUserId(req);
    
    if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    try {
        const user = await getUserProfile(userId);
        if (user) {
            // Remove sensitive information
            const userProfile = {
                username: user.username,
                displayName: user.displayName,
                email: user.email,
                profileImgUrl: user.profileImgUrl,
                hasCanvasToken: !!user.canvasToken
            };
            res.json(userProfile);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
};

// Update User Profile
export const updateProfile = async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { displayName, email } = req.body;

    if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    try {
        const updatedUser = await updateUserProfile(
            userId,
            { displayName, email }
        );
        if (updatedUser) {
            res.json({
                message: 'Profile updated successfully',
                user: {
                    displayName: updatedUser.displayName,
                    email: updatedUser.email
                }
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Update Canvas Token
export const updateUserCanvasToken = async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { canvasToken } = req.body;

    if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    try {
        const updated = await updateCanvasToken(
            userId, 
            canvasToken
        );
        if (updated) {
            res.json({ message: 'Canvas token updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating canvas token:', error);
        res.status(500).json({ error: 'Failed to update canvas token' });
    }
};

// Delete Account
export const deleteAccount = async (req: Request, res: Response) => {
    const userId = getUserId(req);

    if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    try {
        const deleted = await deleteUserAccount(userId);
        if (deleted) {
            // If using session auth, clear the session
            const userReq = req as AuthRequest;
            if (userReq.session) {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Error destroying session:', err);
                    }
                });
            }
            res.json({ message: 'Account deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUserProfiles();
        // Remove sensitive information
        const userProfiles = users.map(user => ({
            id: user.githubId,
            username: user.username,
            displayName: user.displayName,
            profileImgUrl: user.profileImgUrl,
            createdAt: user.createdAt
        }));
        res.json(userProfiles);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};