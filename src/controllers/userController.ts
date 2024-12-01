import { Request, Response } from 'express';
import { createUser, updateUser, deleteUser, getUserById, getAllUsers } from '../services/userService';

// Create User
const create = async (req: Request, res: Response) => {
    try {
        const newUser = await createUser(
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName
        );
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create user' });
    }
};

// Update User
const update = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUser(req.body.firstName, req.body.lastName);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update user' });
    }
};

// Get All Users
const getAll = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve users' });
    }
};

// Get User by ID
const getById = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve user' });
    }
};

// Delete User
const remove = async (req: Request, res: Response) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        if (deletedUser != null) {
            res.send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete user' });
    }
};

export {
    create,
    update,
    getAll,
    getById,
    remove,
}
