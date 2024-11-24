import express from 'express';

const categoryRouter = express.Router();

// Create a new category
categoryRouter.post('/category', (req, res) => {
    /* #swagger.category = ['category']
       #swagger.summary = 'Create a new category'
       #swagger.description = 'Create a new category for a user.'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/category' }
               }
           }
       }
       #swagger.responses[201] = {
           description: 'category created successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/category' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
    */
    res.send('Create category handler is not implemented yet');
});

// Get all category
categoryRouter.get('/category', (req, res) => {
    /* #swagger.category = ['category']
       #swagger.summary = 'Get all category'
       #swagger.description = 'Retrieve all categories for the user.'
       #swagger.responses[200] = {
           description: 'category retrieved successfully',
           content: {
               'application/json': {
                   schema: {
                       type: 'array',
                       items: { $ref: '#/components/schemas/category' }
                   }
               }
           }
       }
    */
    res.send('Get all category handler is not implemented yet');
});

// Get a single category by ID
categoryRouter.get('/category/:id', (req, res) => {
    /* #swagger.category = ['category']
       #swagger.summary = 'Get a category by ID'
       #swagger.description = 'Fetch a category by its unique ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'The unique ID of the category'
       }
       #swagger.responses[200] = {
           description: 'category found',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/category' }
               }
           }
       }
       #swagger.responses[404] = { description: 'category not found' }
    */
    res.send('Get category by ID handler is not implemented yet');
});

// Update a category by ID
categoryRouter.put('/category/:id', (req, res) => {
    /* #swagger.category = ['category']
       #swagger.summary = 'Update a category'
       #swagger.description = 'Update an existing category by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'The unique ID of the category'
       }
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/category' }
               }
           }
       }
       #swagger.responses[200] = {
           description: 'category updated successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/category' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
       #swagger.responses[404] = { description: 'category not found' }
    */
    res.send('Update category handler is not implemented yet');
});

// Delete a category by ID
categoryRouter.delete('/category/:id', (req, res) => {
    /* #swagger.category = ['category']
       #swagger.summary = 'Delete a category'
       #swagger.description = 'Delete a category by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the category'
       }
       #swagger.responses[200] = { description: 'category deleted successfully' }
       #swagger.responses[404] = { description: 'category not found' }
    */
    res.send('Delete category handler is not implemented yet');
});

export default categoryRouter;
