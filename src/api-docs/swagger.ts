import { version } from 'mongoose';
import swaggerAutogen from 'swagger-autogen';

const OPTIONS = {
  openapi: '3.0.0',
};
const doc = {
  info: {
    title: 'OrganizeMe API',
    version: '1.0.0',
    description: 'API documentation for the OrganizeMe project',
  },
  host: 'organizeme-xtcl.onrender.com',
  schemes: ["https"],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your API token with the `Bearer` prefix, e.g. "Bearer abcdef123456"'
    }
  },
  security: [{
    bearerAuth: []
  }],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          "email": {
            "type": "string",
            "description": "Email of the user"
          },
          "passwordHash": {
            "type": "string",
            "description": "The password of the user"
          },
          "firstName": {
            "type": "string",
            "description": "User's first name"
          },
          "lastName": {
            "type": "string",
            "description": "User's last name"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Date of User creation"
          },
          "updateAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the user was last updated"
          }
        },
        "required": ["email", "passwordHash", "firstName", "lastName" ]
      },
      Task: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the task',
          },
          description: {
            type: 'string',
            description: 'Details about the task',
          },
          dueDate: {
            type: 'string',
            format: 'date',
            description: 'The due date of the task',
          },
          status: {
            type: 'string',
            description: 'The current status of the task',
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
          },
          priority: {
            type: 'string',
            description: 'The priority level of the task',
            enum: ['low', 'medium', 'high'],
            default: 'medium',
          },
          userId: {
            type: 'string',
            description: 'The identifier of the user who owns the task.'
          },
          tags: {
            type: 'array',
            items:{
              type: 'string',
              description: 'Unique identifier for the category associated with the taks'
            }
          },
          categoryId: {
            type: 'string',
            description: 'Identifier for category this task belongs to'
          }
        },
        required: ['title', 'description', 'dueDate', 'priority'],
      },
      Category: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the category',
          },
          colorHex: {
            type: 'string',
            description: 'The hex color code for the category',
            example: '#FF5733',
          },
          userId: {
            type: 'string',
            description: 'The ID of the user who owns this category',
          },
        },
        required: ['name', 'colorHex', 'userId'],
      },
      Log: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the log',
          },
          userId: {
            type: 'string',
            description: 'The ID of the user who performed the action',
          },
          action: {
            type: 'string',
            description: 'The type of action performed',
            enum: ['CREATE', 'UPDATE', 'DELETE'],
          },
          targetType: {
            type: 'string',
            description: 'The type of entity the action was performed on'
          },
          targetId: {
            type: 'string',
            description: 'The ID of the target entity',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'The timestamp when the action occurred',
          },
        },
        required: ['userId', 'action', 'targetType', 'targetId'],
      },
    },
  },
  tags: [
    {
      name: 'User',
      description: 'Operations related to users',
    },
    {
      name: 'Task',
      description: 'Operations related to tasks',
    },
    {
      name: 'Category',
      description: 'Operations related to category',
    },
    {
      name: 'Logs',
      description: 'Operations related to logs',
    },
  ],
};


const outputFile = './swagger-output.json';
const endpointsFiles = [
  '../routes/user.ts',
  '../routes/task.ts',
  '../routes/category.ts',
  '../routes/log.ts'
]; 

swaggerAutogen(OPTIONS)(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
