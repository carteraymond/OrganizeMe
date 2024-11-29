import express from 'express';
import { Request, Response } from 'express';
import { loadSignInPage, loadHomePage, auth } from '../controllers/homeController';

const homeRouter = express.Router();

homeRouter.get('/', loadHomePage);

export default homeRouter;