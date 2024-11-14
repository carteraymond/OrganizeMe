import { Request, Response } from 'express';
import { createNewUser } from '../services/userService';

// var createdUser = await createNewUser("test@test.com", "hash", "Johnny", "Sanabria");

const createUser = async (req: Request, res: Response) => {  
    const newUser = await createNewUser(
        req.body.email,
        req.body.password, 
        req.body.firstName, 
        req.body.lastName
    );
    
    // FIXME: Add Error Handling
    res.send(newUser);
};

export {
    createUser
}