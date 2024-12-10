import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api-docs/swagger-output.json';
import userRouter from './user';
import authRouter from './auth';
import homeRouter from './home';
import taskRouter from './task';
import categoryRouter from './category';
import logRouter from './log';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes (no auth required)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', authRouter);

// Protected routes (auth required)
router.use('/user', requireAuth, userRouter);
router.use('/home', requireAuth, homeRouter);
router.use('/task', requireAuth, taskRouter);
router.use('/category', requireAuth, categoryRouter);
router.use('/log', requireAuth, logRouter);

// Default redirect to auth if not logged in
router.get('/', (req: Request, res: Response): void => {
    res.redirect('/auth');
});

export default router;