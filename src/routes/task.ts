import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const TaskRouter = express.Router();

// Apply authentication middleware to all routes
TaskRouter.use(requireAuthAPI);

// Root routes (/task)
const rootRoute = TaskRouter.route('/');
rootRoute.get(getAll);    // GET /task
rootRoute.post(create);   // POST /task

// ID-specific routes (/task/:id)
const idRoute = TaskRouter.route('/:id');
idRoute.get(getId);       // GET /task/:id
idRoute.put(update);      // PUT /task/:id
idRoute.delete(remove);   // DELETE /task/:id

export default TaskRouter;
