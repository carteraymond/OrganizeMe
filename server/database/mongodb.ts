import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connStr: string = process.env['MONGODB_CONN_STR'] ?? '';

mongoose.connect(connStr)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Could not connect to MongoDB', err));