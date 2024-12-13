import express from 'express';
import { createToken, listTokens, deleteToken } from '../controllers/tokenController';
import { requireAuth } from '../middleware/authMiddleware';

const tokenRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: API Tokens
 *   description: API token management
 */

// Create token
// Body: { "name": "My API Token" }
tokenRouter.post('/', requireAuth, createToken); 
// we have to use the session to auth the user bc they don't have a token
// there is a theoretical way to get around this using the GitHub API
// but I am running out of time

// List all API tokens
tokenRouter.get('/', requireAuth, listTokens);

// Delete an API token
tokenRouter.delete('/:name', requireAuth, deleteToken);

export default tokenRouter;