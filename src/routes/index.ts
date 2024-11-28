import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api-docs/swagger-output.json';
import path from 'path';
import userRouter from './user';
import authRouter from './auth'
import taskRouter from './task';
import categoryRouter from './category';
import logRouter from './log';

const router = express.Router();

//router.get('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Serve Swagger UI for API documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Change the File Path to the new index page... when we make it

// const __dirname = path.resolve(path.dirname(''));
// router.get('/', (req: Request, res: Response): void => {
//     res.sendFile(path.join(__dirname, '../dist/organize-me/browser/index.html'));
// });

router.use('/user', userRouter);
router.use('/auth', authRouter)
router.use('/task', taskRouter);
router.use('/category', categoryRouter);
router.use('/log', logRouter);

export default router;
