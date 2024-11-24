import { Request, Response } from 'express';
import { createUser, updateUser, deleteUser, getUserById, getAllUsers } from '../services/userService';

// var createdUser = await createNewUser("test@test.com", "hash", "Johnny", "Sanabria");

const create = async (req: Request, res: Response) => {  
    const newUser = await createUser(
        req.body.email,
        req.body.password,
        req.body.firstName, 
        req.body.lastName
    );

    res.send(newUser);
};

const update = async (req: Request, res: Response) => {
    const updatedUser = await updateUser(req.body.firstName, req.body.lastName);

    // Error Handling needed
    res.send(updateUser);
};

export {
    create,
    update,
}