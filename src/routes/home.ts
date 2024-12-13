import express from 'express';
import { Request, Response } from 'express';
import { loadHomePage } from '../controllers/homeController';

const homeRouter = express.Router();

homeRouter.get('/', loadHomePage);

export default homeRouter;