/*import { createCategoryController, getAllCategoriesController, deleteCategoryController } from '../../controllers/categoryController';
import * as mockCategoryService from '../../services/categoryService';
import { Request, Response } from 'express';

jest.mock('../../services/categoryService');

describe('Category Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();  // Clear mocks before each test
    });

  describe('createCategoryController', () => {
    it('should create a category successfully', async () => {
      // Mock category to be returned by the service
      const mockCategory = { name: 'Test Category', colorHex: '#FFFFFF', userId: '123', };
      
      // Mock the createCategory method in the service
      (mockCategoryService.createCategory as jest.Mock).mockResolvedValue(mockCategory);


      const req = { body: { name: 'Test Category', colorHex: '#FFFFFF', userId: '123' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      // Call the controller
      await createCategoryController(req, res);

      // Assertions
      expect(mockCategoryService.createCategory).toHaveBeenCalledWith('Test Category', '#FFFFFF', '123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Category created successfully',
        category: mockCategory
      });
    });

    it('should return a 400 error for invalid input', async () => {
      const req = { body: { name: 'Test Category' } } as Request; // Missing required fields
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      // Call the controller
      await createCategoryController(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: name, colorHex, and userId' });
    });
  });


  describe('getAllCategoriesController', () => {
    it('should retrieve all categories', async () => {
      const mockCategories = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }];
      
      // Mock the getAllCategories method
      (mockCategoryService.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);


      const req = {} as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      // Call the controller
      await getAllCategoriesController(req, res);

      // Assertions
      expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        categories: mockCategories,
        message: 'Categories retrieved successfully',
      });
    });
  });

  describe('deleteCategoryController', () => {
    it('should delete a category by ID', async () => {
        const mockCategory = { id: '1', name: 'Category 1' };
      //const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      
      // Mock the deleteCategory method to return a category (indicating successful deletion)
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValue(mockCategory);

      const req = { params: { id: '1' } } as unknown as Request;  // The ID is passed in params
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;


      await deleteCategoryController(req, res);

      expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully', deletedCategory: mockCategory, });
    });

    it('should return a 404 error if the category is not found', async () => {
        // Mock the deleteCategory method to return null (category not found)
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValue(null);
      const req = { params: { id: '999' } } as unknown as Request; // Non-existent category ID
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      // Call the controller
      await deleteCategoryController(req, res);

      // Assertions
      expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith('999');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });

});
*/




import request from 'supertest';  // Import supertest to simulate HTTP requests
import { app } from '../../../server';  // Import Express app
import * as mockCategoryService from '../../services/categoryService'; 
import mongoose from 'mongoose';  // Import mongoose to generate a valid ObjectId



jest.mock('../../services/categoryService');

let server;
beforeAll(async () => {
  server = await app.listen(3001, () => console.log('Server listening at 3000'));
});

afterAll((done) => {
  // Close the server after tests are complete
  if (server) {
    server.close(done);
  }
});

describe('Category Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Clear mocks before each test
  });

  describe('POST /category', () => {
    it('should create a category successfully', async () => {

      // Generate a valid userId using mongoose.Types.ObjectId
      const validUserId = new mongoose.Types.ObjectId().toString();

      const mockCategory = { name: 'Test Category', colorHex: '#FFFFFF', userId: validUserId };
      
      // Mock the service
      (mockCategoryService.createCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post('/category')
        .send({ name: 'Test Category', colorHex: '#FFFFFF', userId: validUserId });

      expect(response.status).toBe(201);
      expect(response.body.category.name).toBe('Test Category');
      expect(response.body.category.colorHex).toBe('#FFFFFF');
      expect(response.body.category.userId).toBe(validUserId);
      //expect(response.body.message).toBe('Category created successfully');
      //expect(response.body.category).toEqual(mockCategory);
      //expect(mockCategoryService.createCategory).toHaveBeenCalledWith('Test Category', '#FFFFFF', validUserId);
    });

    it('should return a 400 error for invalid input', async () => {
      const response = await request(app)
        .post('/category')
        .send({ name: 'Test Category' });  // Missing required fields

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields: name, colorHex, and userId');
    });
  });

  describe('GET /categories', () => {
    it('should retrieve all categories', async () => {
      const mockCategories = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }];
      
      // Mock the service
      (mockCategoryService.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      const response = await request(app).get('/category');

      expect(response.status).toBe(200);
      expect(response.body.categories).toEqual(mockCategories);
      expect(response.body.message).toBe('Categories retrieved successfully');
    });
  });

  describe('DELETE /category/:id', () => {
    it('should delete a category by ID', async () => {
      const mockCategory = { id: '1', name: 'Category 1' };
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .delete('/category/1');  // Delete category by ID

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Category deleted successfully');
      expect(response.body.deletedCategory).toEqual(mockCategory);
    });

    it('should return a 404 error if the category is not found', async () => {
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/category/999');  // Non-existent category ID

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Category not found');
    });
  });
});





/*import request from 'supertest';
import { app } from '../../../server';
import * as mockCategoryService from '../../services/categoryService';

describe('Category Routes', () => {
  it('should create a category successfully', async () => {
    const mockCategory = { _id: '1',name: 'Test Category', colorHex: '#FFFFFF', userId: '123', __v: 0 };
    const response = await request(app)
      .post('/categories')
      .send(mockCategory);

    expect(response.status).toBe(201);  // Expect 201 for successful creation
    expect(response.body.message).toBe('Category created successfully');
    expect(response.body.category).toEqual(mockCategory);
  });

  it('should retrieve all categories', async () => {
    const mockCategories = [
      { name: 'Category 1', colorHex: '#FFFFFF', userId: '123' },
      { name: 'Category 2', colorHex: '#000000', userId: '123' },
    ];

    // Mock the category service or database call if needed
    jest.spyOn(mockCategoryService, 'getAllCategories').mockResolvedValue(mockCategories);

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200); // Expect 200 OK status
    expect(response.body.categories).toEqual(mockCategories); // Check the response body
    expect(response.body.message).toBe('Categories retrieved successfully'); // Check success message
  });

  it('should delete a category by ID', async () => {
    const mockCategory = { name: 'Category 1', colorHex: '#FFFFFF', userId: '123' };
    const categoryId = '1'; // The ID to delete

    // Mock the category service or database call to return the category
    jest.spyOn(mockCategoryService, 'deleteCategory').mockResolvedValue(mockCategory);

    const response = await request(app).delete(`/categories/${categoryId}`);

    expect(response.status).toBe(200); // Expect 200 OK status
    expect(response.body.message).toBe('Category deleted successfully'); // Success message
    expect(response.body.deletedCategory).toEqual(mockCategory); // Ensure deleted category is returned
  });

  it('should return a 404 error if the category is not found', async () => {
    const categoryId = 'nonexistent-id'; // An ID that does not exist

    // Mock the category service to simulate a category not found scenario
    jest.spyOn(mockCategoryService, 'deleteCategory').mockResolvedValue(null);

    const response = await request(app).delete(`/categories/${categoryId}`);

    expect(response.status).toBe(404); // Expect 404 Not Found status
    expect(response.body.message).toBe('Category not found'); // Error message when category is not found
  });

});







import request from 'supertest';
import { app } from '../../../server'; // Your express app
import * as mockCategoryService from '../../services/categoryService';

jest.mock('../../services/categoryService');

describe('Category Routes', () => {
  describe('POST /category', () => {
    it('should create a category successfully', async () => {
      const mockCategory = { name: 'Test Category', colorHex: '#FFFFFF', userId: '123' };
      (mockCategoryService.createCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post('/category') 
        .send({
          name: 'Test Category',
          colorHex: '#FFFFFF',
          userId: '123'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Category created successfully');
      expect(response.body.category).toEqual(mockCategory);
    });

    it('should return a 400 error for invalid input', async () => {
      const response = await request(app)
        .post('/category')
        .send({ name: 'Test Category' }); // Missing required fields

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields: name, colorHex, and userId');
    });
  });

  describe('GET /categories', () => {
    it('should retrieve all categories', async () => {
      const mockCategories = [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }];
      (mockCategoryService.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

      const response = await request(app).get('/category'); // Adjust the route as needed

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Categories retrieved successfully');
      expect(response.body.categories).toEqual(mockCategories);
    });
  });

  /*describe('DELETE /category/:id', () => {
    it('should delete a category by ID', async () => {
      const mockCategory = { id: '1', name: 'Category 1' };

      // Mock the service function to return the mock category
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .delete('/category/1') 
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Category deleted successfully');
      expect(response.body.deletedCategory).toEqual(mockCategory);
    });

    it('should return a 404 error if the category is not found', async () => {
      (mockCategoryService.deleteCategory as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .delete('/category/999') // Non-existent category ID
        .send();

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Category not found');
    });
  });
});*/









