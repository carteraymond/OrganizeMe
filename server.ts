import express from 'express';
import routes from './src/routes';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './src/database/mongodb';
import requestLogger from './src/middleware/Logger';

// Load environment variables before any other operations to ensure all configs are available
dotenv.config();

// ES modules don't have __dirname, so I had to make them myself
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database connection early to fail fast if DB connection issues exist
connectDB();

const app = express();
const port: number = 3000;

// '*' origin is for development CHANGE FOR PROD
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Validate critical environment variables early in the application lifecycle
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

// Session configuration with secure defaults
// resave: false prevents unnecessary session saves
// saveUninitialized: true ensures compliance with laws requiring permission before setting cookies
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Configure view engine and static file serving
// Views are kept in src/views 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Serve static files from src/public with absolute path resolution
app.use(express.static(path.join(__dirname, 'src/public')));

// Parse JSON payloads for REST API endpoints
app.use(express.json());

// This allows every HTTP request to be logged
app.use(requestLogger);

app.use('/', routes);

app.listen(port, (): void => {
  console.log(`Server listening at ${port}`);
});