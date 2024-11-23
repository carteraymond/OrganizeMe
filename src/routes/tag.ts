import express from 'express';

const tagRouter = express.Router();

// Create a new tag
tagRouter.post('/tags', (req, res) => {
    /* #swagger.tags = ['Tags']
       #swagger.summary = 'Create a new tag'
       #swagger.description = 'Create a new tag for a user.'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Tag' }
               }
           }
       }
       #swagger.responses[201] = {
           description: 'Tag created successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Tag' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
    */
    res.send('Create tag handler is not implemented yet');
});

// Get all tags
tagRouter.get('/tags', (req, res) => {
    /* #swagger.tags = ['Tags']
       #swagger.summary = 'Get all tags'
       #swagger.description = 'Retrieve all tags for the user.'
       #swagger.responses[200] = {
           description: 'Tags retrieved successfully',
           content: {
               'application/json': {
                   schema: {
                       type: 'array',
                       items: { $ref: '#/components/schemas/Tag' }
                   }
               }
           }
       }
    */
    res.send('Get all tags handler is not implemented yet');
});

// Get a single tag by ID
tagRouter.get('/tags/:id', (req, res) => {
    /* #swagger.tags = ['Tags']
       #swagger.summary = 'Get a tag by ID'
       #swagger.description = 'Fetch a tag by its unique ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'The unique ID of the tag'
       }
       #swagger.responses[200] = {
           description: 'Tag found',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Tag' }
               }
           }
       }
       #swagger.responses[404] = { description: 'Tag not found' }
    */
    res.send('Get tag by ID handler is not implemented yet');
});

// Update a tag by ID
tagRouter.put('/tags/:id', (req, res) => {
    /* #swagger.tags = ['Tags']
       #swagger.summary = 'Update a tag'
       #swagger.description = 'Update an existing tag by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'The unique ID of the tag'
       }
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Tag' }
               }
           }
       }
       #swagger.responses[200] = {
           description: 'Tag updated successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Tag' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
       #swagger.responses[404] = { description: 'Tag not found' }
    */
    res.send('Update tag handler is not implemented yet');
});

// Delete a tag by ID
tagRouter.delete('/tags/:id', (req, res) => {
    /* #swagger.tags = ['Tags']
       #swagger.summary = 'Delete a tag'
       #swagger.description = 'Delete a tag by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the tag'
       }
       #swagger.responses[200] = { description: 'Tag deleted successfully' }
       #swagger.responses[404] = { description: 'Tag not found' }
    */
    res.send('Delete tag handler is not implemented yet');
});

export default tagRouter;
