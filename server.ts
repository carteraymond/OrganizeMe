import express from 'express';
import routes from './src/routes';
import session from 'express-session';
import MongoStore from 'connect-mongodb-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './src/database/mongodb';

dotenv.config();

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET must be set in environment variables');
}

// When the app is deployed in prod, add NODE_ENV=production to env
// When in prod:
// - Cookies must be send over HTTPS
// - Only alow CORS requests from our domain
// If we set the values to this all of the time, localhost won't work
if (process.env.NODE_ENV === 'production' && !process.env.PRODUCTION_DOMAIN) {
    throw new Error('PRODUCTION_DOMAIN must be set in environment variables when in production mode');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port: number = 3000;

// Initialize MongoDB connection
connectDB();

// Create MongoDB session store
const MongoDBStore = MongoStore(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_CONN_STR || '',
    collection: 'sessions'
});

// Catch errors in session store
store.on('error', function(error) {
    console.error('Session Store Error:', error);
});

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // Prevent client-side access
        sameSite: 'lax', // Enable cross-origin cookie use
    },
    store: store,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId'
}));
if (process.env.NODE_ENV === 'production'){
    app.set('trust proxy', 1);
}

app.use((req, res, next) => {
    console.log('Session Middleware Initialized:', req.session);
    next();
  });
// Cross-Origin Resource Sharing
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DOMAIN : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine (for ejs)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', routes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke :(' });
});

app.listen(port, (): void => {
    console.log(`Server listening at ${port}`);
});