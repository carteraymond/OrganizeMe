import express from 'express';
import { isAuthenticated, createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController';

const taskRouter = express.Router();

// Apply authentication middleware to all task routes
taskRouter.use(isAuthenticated);

// Create a new task
taskRouter.post('/', (req, res) => {
    /* #swagger.tags = ['Tasks']
       #swagger.summary = 'Create a new task'
       #swagger.description = 'Create a new task. Requires authentication.'
       #swagger.security = [{ "session": [] }]
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
       #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return createTask(req, res);
});

// Get all tasks
taskRouter.get('/', (req, res) => {
    /* #swagger.tags = ['Tasks']
       #swagger.summary = 'Get all tasks'
       #swagger.description = 'Retrieve all tasks for the authenticated user.'
       #swagger.security = [{ "session": [] }]
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
       #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return getTasks(req, res);
});

// Get a single task by ID
taskRouter.get('/:id', (req, res) => {
    /* #swagger.tags = ['Tasks']
       #swagger.summary = 'Get a task by ID'
       #swagger.description = 'Fetch a task by its ID. User can only access their own tasks.'
       #swagger.security = [{ "session": [] }]
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
       #swagger.responses[401] = { description: 'Unauthorized' }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    return getTask(req, res);
});

// Update a task by ID
taskRouter.put('/:id', (req, res) => {
    /* #swagger.tags = ['Tasks']
       #swagger.summary = 'Update a task'
       #swagger.description = 'Update an existing task by its ID. User can only update their own tasks.'
       #swagger.security = [{ "session": [] }]
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
           }nst TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },  // Store GitHub user ID
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'tasks' });

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
       }
       #swagger.responses[400] = { description: 'Bad request' }
       #swagger.responses[401] = { description: 'Unauthorized' }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    return updateTask(req, res);
});

// Delete a task by ID
taskRouter.delete('/:id', (req, res) => {
    /* #swagger.tags = ['Tasks']
       #swagger.summary = 'Delete a task'
       #swagger.description = 'Delete a task by its ID. User can only delete their own tasks.'
       #swagger.security = [{ "session": [] }]
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the task'
       }
       #swagger.responses[200] = { description: 'Task deleted successfully' }
       #swagger.responses[401] = { description: 'Unauthorized' }
       #swagger.responses[404] = { description: 'Task not found' }
    */
    return deleteTask(req, res);
});

export default taskRouter;