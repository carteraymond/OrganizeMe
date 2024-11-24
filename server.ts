import express from 'express';
import routes from './src/routes';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './src/database/mongodb';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This connects the mongoose client and will persist for the application's life cylce
connectDB();

const app = express();
const port: number = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.json());
app.use('/', routes);

app.listen(port, (): void => {
  console.log(`Server listening at ${port}`);
});