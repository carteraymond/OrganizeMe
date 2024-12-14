import User from '../models/user';

interface ProfileUpdateData {
    displayName?: string;
    email?: string;
}

interface CreateUserData {
    githubId: string;
    username: string;
    displayName: string;
    email?: string;
    profileImgUrl?: string;
}

// Create new user
export const createUserProfile = async (userData: CreateUserData) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ githubId: userData.githubId });
        if (existingUser) {
            throw new Error('User with this GitHub ID already exists');
        }

        // Create new user instance
        const user = new User({
            githubId: userData.githubId,
            username: userData.username,
            displayName: userData.displayName,
            email: userData.email,
            profileImgUrl: userData.profileImgUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Save the user to database
        await user.save();
        return user;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
};

// Get user profile by GitHub ID
export const getUserProfile = async (githubId: string) => {
    try {
        return await User.findOne({ githubId });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (
    githubId: string, 
    updateData: ProfileUpdateData
) => {
    try {
        const user = await User.findOne({ githubId });
        if (!user) return null;

        if (updateData.displayName) {
            user.displayName = updateData.displayName;
        }
        if (updateData.email) {
            user.email = updateData.email;
        }

        user.updatedAt = new Date();
        await user.save();
        return user;
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        throw error;
    }
};

// Update Canvas token
export const updateCanvasToken = async (
    githubId: string, 
    canvasToken: string
) => {
    try {
        const result = await User.updateOne(
            { githubId },
            { 
                $set: { 
                    canvasToken,
                    updatedAt: new Date()
                }
            }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error in updateCanvasToken:', error);
        throw error;
    }
};

// Delete user account
export const deleteUserAccount = async (githubId: string) => {
    try {
        const result = await User.deleteOne({ githubId });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error in deleteUserAccount:', error);
        throw error;
    }
};

export const getAllUserProfiles = async () => {
    try {
        return await User.find({}).sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error in getAllUserProfiles:', error);
        throw error;
    }
};