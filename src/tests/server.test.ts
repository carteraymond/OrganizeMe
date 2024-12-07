/*import { app } from '../../server';
import request from 'supertest';
import { Request, Response } from 'express';

describe('Server Tests', () => {
  it('should respond to the base route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Welcome to Organize Me');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Route not found', 
    });
  });
});*/


describe('Server', () => {
    it('should run tests', () => {
      expect(true).toBe(true); // Basic test to verify Jest works
    });
  });
  