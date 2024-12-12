import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const taskRouter = express.Router();

// Apply authentication middleware to all routes
taskRouter.use(requireAuthAPI);

// Root routes (/task)
const rootRoute = taskRouter.route('/');
rootRoute.get(getAll);    // GET /task
rootRoute.post(create);   // POST /task

// ID-specific routes (/task/:id)
const idRoute = taskRouter.route('/:id');
idRoute.get(getId);       // GET /task/:id
idRoute.put(update);      // PUT /task/:id
idRoute.delete(remove);   // DELETE /task/:id

export default taskRouter;
