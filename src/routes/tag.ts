import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/tagController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const tagRouter = express.Router();

// Apply authentication middleware to all routes
tagRouter.use(requireAuthAPI);

// Root routes (/tag)
const rootRoute = tagRouter.route('/');
rootRoute.get(getAll);    // GET /tag
rootRoute.post(create);   // POST /tag

// ID-specific routes (/tag/:id)
const idRoute = tagRouter.route('/:id');
idRoute.get(getId);       // GET /tag/:id
idRoute.put(update);      // PUT /tag/:id
idRoute.delete(remove);   // DELETE /tag/:id

export default tagRouter;
