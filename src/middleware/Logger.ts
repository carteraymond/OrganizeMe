import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.MongoDB({
      db: process.env.MONGODB_CONN_STR!,
      collection: 'logs',
      tryReconnect: true,
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: (req, res) => {
    // Customize the log message
    return `Method: ${req.method} TargetURL: ${req.url}`;
  },
  expressFormat: true,
  ignoreRoute: (req, res) => req.method === 'GET', // Ignore GET requests
});

export default requestLogger;
