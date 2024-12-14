import express from 'express';
import { 
    getCurrentUser, 
    updateProfile, 
    updateUserCanvasToken,
    deleteAccount,
    getAllUsers,
    createUser
} from '../controllers/userController';
import { requireAuth, requireAuthAPI } from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/', requireAuthAPI, createUser);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authenticated
 */
userRouter.get('/profile', requireAuthAPI, getCurrentUser);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *       - SessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authenticated
 */
userRouter.put('/profile', requireAuthAPI, updateProfile);

/**
 * @swagger
 * /user/canvas-token:
 *   put:
 *     summary: Update Canvas API token
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *       - SessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               canvasToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Canvas token updated successfully
 *       401:
 *         description: Not authenticated
 */
userRouter.put('/canvas-token', requireAuthAPI, updateUserCanvasToken);

/**
 * @swagger
 * /user/account:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Not authenticated
 */
userRouter.delete('/profile', requireAuth, deleteAccount);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Not authenticated
 */
userRouter.get('/', requireAuthAPI, getAllUsers);

export default userRouter;