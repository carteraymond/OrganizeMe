import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api-docs/swagger-output.json';
import userRouter from './user';
import authRouter from './auth';
import homeRouter from './home';
import taskRouter from './task';
import categoryRouter from './category';
import logRouter from './log';
import { requireAuth, requireAuthAPI } from '../middleware/authMiddleware';
import tokenRouter from './token';

const router = express.Router();

// Public routes (no auth required)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', authRouter);

// Protected routes (auth required)
// requireAuth redirects browser to /auth if not logged in
// requireAuthAPI returns 401 in json if not logged in
router.use('/home', requireAuth, homeRouter);
router.get('/token/manage', requireAuth, (req: Request, res: Response) => {
    res.render('token');
});
router.use('/token', requireAuth, tokenRouter);
router.use('/api/user', requireAuthAPI, userRouter);
router.use('/api/task', requireAuthAPI, taskRouter);
router.use('/api/category', requireAuthAPI, categoryRouter);
router.use('/api/log', requireAuthAPI, logRouter);

// Default redirect to auth if not logged in
router.get('/', (req: Request, res: Response): void => {
    res.redirect('/auth');
});

export default router;