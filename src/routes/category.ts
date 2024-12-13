import express from 'express';
import { create, getAll, remove } from '../controllers/categoryController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const categoryRouter = express.Router();



// Create a new category
categoryRouter.post(
    '/', 

    requireAuthAPI,
    create

    /* #swagger.tags = ['Category']
       #swagger.summary = 'Create a new category'
       #swagger.description = 'Create a new category for a user.'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Category' }
               }
           }
       }
       #swagger.responses[201] = {
           description: 'Category created successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Category' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
    */
);

// Get all categories
categoryRouter.get(
    '/', 
    requireAuthAPI,
    getAll

    /* #swagger.tags = ['Category']
       #swagger.summary = 'Get all categories'
       #swagger.description = 'Retrieve all categories for the user.'
       #swagger.responses[200] = {
           description: 'Categories retrieved successfully',
           content: {
               'application/json': {
                   schema: {
                       type: 'array',
                       items: { $ref: '#/components/schemas/Category' }
                   }
               }
           }
       }
    */

);

// Delete a category by ID
categoryRouter.delete(
    '/:id', 
    requireAuthAPI,
    remove

    /* #swagger.tags = ['Category']
       #swagger.summary = 'Delete a category'
       #swagger.description = 'Delete a category by its ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the category to delete'
       }
       #swagger.responses[200] = { 
            description: 'Category deleted successfully',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/Category' }
                }
            }
       }
       #swagger.responses[404] = { description: 'Category not found' }
       #swagger.responses[400] = { description: 'Bad request' }
    */

);


export default categoryRouter;