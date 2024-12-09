import express from 'express';
import { create, getAll, getId, remove, update } from '../controllers/taskController';

const taskRouter = express.Router();

// Create a new task
taskRouter.post('/', create);

// Get all tasks
taskRouter.get('/', getAll);
/* #swagger.task = ['Tasks']
       #swagger.summary = 'Get all tasks'
       #swagger.description = 'Fetch all tasks in database.'
       #swagger.responses[200] = {
           description: 'Task found',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[404] = { description: 'Task not found' }
    */
// Get a single task by ID
taskRouter.get('/:id', (req, res) => {
    /* #swagger.task = ['Tasks']
       #swagger.summary = 'Get a task by ID'
       #swagger.description = 'Fetch a task by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the task'
       }
       #swagger.responses[200] = {
           description: 'Task found',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    res.send(getId);
});

// Update a task by ID
taskRouter.put('/:id', (req, res) => {
    /* #swagger.task = ['Tasks']
       #swagger.summary = 'Update a task'
       #swagger.description = 'Update an existing task by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the task'
       }
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[200] = {
           description: 'Task updated successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    res.send(update);
});

// Delete a task by ID
taskRouter.delete('/:id', (req, res) => {
    /* #swagger.task = ['Tasks']
       #swagger.summary = 'Delete a task'
       #swagger.description = 'Delete a task by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the task'
       }
       #swagger.responses[200] = { description: 'Task deleted successfully' }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    res.send(remove);
});

export default taskRouter;
