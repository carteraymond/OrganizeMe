import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';

const taskRouter = express.Router();
// Create a new task
taskRouter.post('/', (req, res) => {
    create(req, res);  // Call create function with req and res
});

// Get all tasks
taskRouter.get('/', (req, res) => {
    getAll(req, res);  // Call getAll function with req and res
});

// Get a single task by ID
taskRouter.get('/:id', (req, res) => {
    getId(req, res);  // Call getId function with req and res
});

// Update a task by ID
taskRouter.put('/:id', (req, res) => {
    update(req.params.id, req.body, res);  // Pass the ID from params
});

// Delete a task by ID
taskRouter.delete('/:id', (req, res) => {
    remove(req, res);  // Call remove function with req and res
});

export default taskRouter;
