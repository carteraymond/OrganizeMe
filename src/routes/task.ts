import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const TaskRouter = express.Router();

// Apply authentication middleware to all routes
TaskRouter.use(requireAuthAPI);

// Root routes (/api/task)
const rootRoute = TaskRouter.route('/');
rootRoute.get(getAll);    // GET /api/task
rootRoute.post(create);   // POST /api/task

// ID-specific routes (/api/task/:id)
const idRoute = TaskRouter.route('/:id');
idRoute.get(getId);       // GET /api/task/:id
idRoute.put(update);      // PUT /api/task/:id
idRoute.delete(remove);   // DELETE /api/task/:id

export default TaskRouter;