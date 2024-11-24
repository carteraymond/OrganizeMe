import { createUser } from '../controllers/userController';
import express from 'express';

const userRouter = express.Router();

// userRouter.post('/user', (req, res) => {
//     /* #swagger.tags = ['User']
//        #swagger.summary = 'Create a new user'
//        #swagger.description = 'Create a new user in the system.'
//        #swagger.requestBody = {
//            required: true,
//            content: {
//                'application/json': {
//                    schema: { $ref: '#/components/schemas/User' }
//                }
//            }
//        }
//        #swagger.responses[201] = {
//            description: 'User created successfully',
//            content: {
//                'application/json': {
//                    schema: { $ref: '#/components/schemas/User' }
//                }
//            }
//        }
//        #swagger.responses[400] = { description: 'Bad request' }
//     */
//     // res.send('Create user handler is not implemented yet');
 
// });

userRouter.post('/user', createUser);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user in the system.
 *     requestBody:
 *       description: User object that needs to be created.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */


userRouter.get('/user/:id', (req, res) => {
    /* #swagger.tags = ['User']
       #swagger.summary = 'Get a user by ID'
       #swagger.description = 'Fetch a user by their ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           required: true,
           schema: {
               type: 'string',
           },
           description: 'ID of the user'
       }
       #swagger.responses[200] = {
           description: 'User found',
           content: {
               'application/json': {
                   schema: { $ref: '#/components/schemas/User' }
               }
           }
       }
       #swagger.responses[404] = { description: 'User not found' }
    */
    res.send('Get user by ID handler is not implemented yet');
});

export default userRouter;