import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api-docs/swagger-output.json';
import path from 'path';
import userRouter from './user';

const router = express.Router();

router.get('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const __dirname = path.resolve(path.dirname(''));
router.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../dist/organize-me/browser/index.html'));
});

router.use('/user', userRouter);

export default router;