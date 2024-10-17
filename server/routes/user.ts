import { createUser } from '../controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/user', createUser);

export default userRouter;