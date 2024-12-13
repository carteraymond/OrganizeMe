import express from 'express';
import { Request, Response } from 'express';
import { loadHomePage } from '../controllers/homeController';

const homeRouter = express.Router();

homeRouter.get('/',   () => console.log(`We are Here V`));

export default homeRouter;