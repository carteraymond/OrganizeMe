import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/tagController';

const tagRouter = express.Router();

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
