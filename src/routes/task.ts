import express from 'express';

const taskRouter = express.Router();

// Create a new task
taskRouter.post('/task', (req, res) => {
    /* #swagger.task = ['Tasks']
       #swagger.summary = 'Create a new task'
       #swagger.description = 'Create a new task.'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[201] = {
           description: 'Task created successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Task' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
    */
    res.send('Create task handler is not implemented yet');
});

// Get all tasks
taskRouter.get('/task', (req, res) => {
    /* #swagger.task = ['Tasks']
       #swagger.summary = 'Get all tasks'
       #swagger.description = 'Retrieve all tasks in the system.'
       #swagger.responses[200] = {
           description: 'Tasks retrieved successfully',
           content: {
               'application/json': {
                   schema: {
                       type: 'array',
                       items: { $ref: '#/components/schemas/Task' }
                   }
               }
           }
       }
    */
    res.send('Get all tasks handler is not implemented yet');
});

// Get a single task by ID
taskRouter.get('/task/:id', (req, res) => {
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
    res.send('Get task by ID handler is not implemented yet');
});

// Update a task by ID
taskRouter.put('/task/:id', (req, res) => {
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
    res.send('Update task handler is not implemented yet');
});

// Delete a task by ID
taskRouter.delete('/task/:id', (req, res) => {
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
    res.send('Delete task handler is not implemented yet');
});

export default taskRouter;
