import express from 'express';

const logRouter = express.Router();

// Get all logs
logRouter.get('/log', (req, res) => {
    /* #swagger.tags = ['Logs']
       #swagger.summary = 'Get all logs'
       #swagger.description = 'Retrieve all logs.'
       #swagger.responses[200] = {
           description: 'Logs retrieved successfully',
           content: {
               'application/json': {
                   schema: {
                       type: 'array',
                       items: { $ref: '#/components/schemas/Log' }
                   }
               }
           }
       }
    */
    res.send('Get all logs handler is not implemented yet');
});

export default logRouter;