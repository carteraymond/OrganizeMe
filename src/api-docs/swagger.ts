import { version } from 'mongoose';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'OrganizeMe API',
    version: '1.0.0',
    description: 'API documentation for the OrganizeMe project',
  },
  host: 'localhost:3000',
  schemes: ["http"],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          githubId: {
            type: 'string',
            description: 'The unique GitHub ID of the user',
          },
          username: {
            type: 'string',
            description: 'The username of the user',
          },
          profileImgUrl: {
            type: 'string',
            description: 'URL to the user\'s profile image',
          },
          displayName: {
            type: 'string',
            description: 'The display name of the user',
          },
          canvasToken: {
            type: 'string',
            description: 'Token used for authentication with Canvas',
          },
        },
        required: ['githubId', 'username', 'displayName'],
      },
      Task: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the task',
          },
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
          },
          priority: {
            type: 'string',
            description: 'The priority level of the task',
            enum: ['low', 'medium', 'high'],
          },
          userId: {
            type: 'string',
            description: 'The identifier of the user who owns the task.'
          },
          tags: {
            type: 'array',
            items:{
              type: 'string',
              description: 'Unique identifier for the tag associated with the taks'
            }
          },
          categoryId: {
            type: 'string',
            description: 'Identifier for category this task belongs to'
          }
        },
        required: ['title', 'description', 'dueDate', 'priority'],
      },
      Tag: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the tag',
          },
          name: {
            type: 'string',
            description: 'The name of the tag',
          },
          colorHex: {
            type: 'string',
            description: 'The hex color code for the tag',
            example: '#FF5733',
          },
          userId: {
            type: 'string',
            description: 'The ID of the user who owns this tag',
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
      name: 'Tasks',
      description: 'Operations related to tasks',
    },
    {
      name: 'Tags',
      description: 'Operations related to tasks',
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
  '../routes/tag.ts',
  '../routes/log.ts'
]; 

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
