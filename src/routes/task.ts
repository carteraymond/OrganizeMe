import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';

const taskRouter = express.Router();

// Create a new task
taskRouter.post('/', create);

// Get all tasks
taskRouter.get('/', getAll);

// Get a single task by ID
taskRouter.get('/:id', (req, res) => {
    res.send(getId);
});

// Update a task by ID
taskRouter.put('/:id', (req, res) => {
    res.send(update);
});

// Delete a task by ID
taskRouter.delete('/:id', (req, res) => {
    remove(req, res);  // Correctly passing the req and res to remove
  });
  

export default taskRouter;
