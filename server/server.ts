import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const port: number = 3000;
const __dirname = path.resolve(path.dirname(''));
dotenv.config();

const connStr: string = process.env['MONGODB_CONN_STR'] ?? '';


app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../dist/organize-me/browser/index.html'));
});

mongoose.connect(connStr)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Could not connect to MongoDB', err));


app.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});