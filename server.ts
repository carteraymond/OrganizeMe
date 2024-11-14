import express from 'express';
import routes from './src/routes';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import connectDB from './src/database/mongodb';

dotenv.config();

// This connects the mongoose client and will persist for the application's life cylce
connectDB();

const app = express();
const port: number = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use('/', routes);

app.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Below is code for testing. This will be removed at a later stage.
// import { createNewUser } from './services/userService';

// var createdUser = await createNewUser("test@test.com", "hash", "Johnny", "Sanabria");
