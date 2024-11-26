import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connStr: string = process.env['MONGODB_CONN_STR'] ?? 'mongodb+srv://admin:341@cluster0.5rwti.mongodb.net/organize-me';

if (connStr.length == 0) {
  throw new Error('MONGODB_CONN_STR environment variable is not set');
}

const connectDB = async () => {
  try {
    await mongoose.connect(connStr);
    console.log('Database connected!');
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;