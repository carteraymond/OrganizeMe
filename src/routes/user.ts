import { create, getAll, getById, remove, update } from '../controllers/userController';
import express from 'express';

const userRouter = express.Router();

// Create a new user
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user in the system.
 *     requestBody:
 *       description: User object that needs to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
userRouter.post('/', create);

// Get all users
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve all users from the system.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', getAll);

// Get a user by ID
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     description: Fetch a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', getById);

// Update a user by ID
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     description: Update the details of an existing user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
userRouter.put('/:id', update);

///Delete a user by ID
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     description: Delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
userRouter.delete('/:id', remove);

export default userRouter;
