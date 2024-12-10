import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createCategoryController, deleteCategoryController, getAllCategoriesController } from '../controllers/categoryController';
import { requireAuthAPI } from '../middleware/authMiddleware';

const categoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Operations related to categories
 */


// Create a new category
categoryRouter.post(
    '/', 
    /* #swagger.tags = ['category']
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
           description: 'category created successfully',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/Category' }
               }
           }
       }
       #swagger.responses[400] = { description: 'Bad request' }
    */
    createCategoryController);

// Get all category
categoryRouter.get('/', getAllCategoriesController
    /* #swagger.tags = ['Category']
       #swagger.summary = 'Get all category'
       #swagger.description = 'Retrieve all categories for the user.'
       #swagger.responses[200] = {
           description: 'category retrieved successfully',
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
categoryRouter.delete('/:id', deleteCategoryController
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
            description: 'category deleted successfully' }
            content: {
                'application/json': {
                   schema: {
                       items: { $ref: '#/components/schemas/Category' }
                   }
                }               
            }
       #swagger.responses[404] = { description: 'category not found' }
       #swagger.responses[400] = { description: 'Bad request' }
    */
    );

    export default categoryRouter;




