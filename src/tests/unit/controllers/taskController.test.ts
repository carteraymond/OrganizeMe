import { Request, Response, NextFunction } from 'express';
import { Session, SessionData } from 'express-session';
import {
	create,
	update,
	getAll,
	getId,
	remove,
} from '../../../controllers/taskController';
import * as taskService from '../../../services/taskService';
import { Document } from 'mongoose';
import { Task } from '../../../models/task';

// Mock taskService
jest.mock('../../../services/taskService');

// Types
interface AuthRequest extends Request {
	user?: {
		id: string;
		email: string;
	};
	session: Session &
		Partial<SessionData> & {
			user?: {
				id: string;
				email: string;
			};
		};
}

describe('Task Controller', () => {
	let mockReq: Partial<AuthRequest>;
	let mockRes: Partial<Response>;
	let mockNext: jest.Mock;
	let mockJson: jest.Mock;
	let mockStatus: jest.Mock;

	beforeEach(() => {
		mockJson = jest.fn();
		mockStatus = jest.fn().mockReturnValue({ json: mockJson });
		mockNext = jest.fn();
		mockRes = {
			status: mockStatus,
			json: mockJson,
		};
		mockReq = {
			user: {
				id: 'test-user-id',
				email: 'test@example.com',
			},
			session: {
				id: 'test-session-id',
				cookie: {
					originalMaxAge: null,
					expires: new Date(),
					secure: false,
					httpOnly: true,
					domain: 'localhost',
					path: '/',
				},
				regenerate: jest.fn(function (callback) {
					callback(null);
					return this;
				}),
				destroy: jest.fn(function (callback) {
					callback(null);
					return this;
				}),
				reload: jest.fn(function (callback) {
					callback(null);
					return this;
				}),
				resetMaxAge: jest.fn(),
				save: jest.fn(function (callback) {
					if (callback) callback(null);
					return this;
				}),
				touch: jest.fn(),
				user: {
					id: 'test-user-id',
					email: 'test@example.com',
				},
			},
			body: {},
			params: {},
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create a task successfully', async () => {
			const taskData = {
				title: 'Test Task',
				description: 'Test Description',
				dueDate: new Date(),
				status: 'pending',
				priority: 'critical',
				tags: ['homework', 'exam'],
				categoryId: '123',
			};
			mockReq.body = taskData;

			const mockTask = {
				_id: '1',
				...taskData,
				userId: 'test-user-id',
				__v: 0,
			} as Document<unknown, {}, Task> &
				Task &
				Required<{ _id: unknown }> & { __v: number };
			jest.spyOn(taskService, 'createTask').mockResolvedValue(mockTask);

			await create(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(taskService.createTask).toHaveBeenCalledWith(taskData);
			expect(mockStatus).toHaveBeenCalledWith(201);
			expect(mockJson).toHaveBeenCalledWith({
				success: true,
				data: mockTask,
			});
		});

		it('should return 401 if user is not authenticated', async () => {
			mockReq.user = undefined;
			mockReq.session = undefined;

			await create(
				mockReq as Partial<AuthRequest> as Request,
				mockRes as Response,
				mockNext
			);

			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockJson).toHaveBeenCalledWith({
				success: false,
				error: 'Unauthorized',
			});
		});

		it('should handle service errors', async () => {
			mockReq.body = { title: 'Test Task' };
			jest.spyOn(taskService, 'createTask').mockRejectedValue(
				new Error('Service error')
			);

			await create(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(mockStatus).toHaveBeenCalledWith(500);
			expect(mockJson).toHaveBeenCalledWith({
				success: false,
				error: 'Internal server error',
			});
		});
	});

	describe('update', () => {
		it('should update a task successfully', async () => {
			const taskId = '1';
			const updateData = { title: 'Updated Task' };
			mockReq.params = { id: taskId };
			mockReq.body = updateData;

			const updatedTask = {
				_id: taskId,
				...updateData,
				userId: 'test-user-id',
				__v: 0,
			} as Document<unknown, {}, Task> &
				Task &
				Required<{ _id: unknown }> & { __v: number };
			jest.spyOn(taskService, 'updateTask').mockResolvedValue(
				updatedTask
			);

			await update(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(taskService.updateTask).toHaveBeenCalledWith(
				taskId,
				updateData,
				'test-user-id'
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockJson).toHaveBeenCalledWith({
				success: true,
				data: updatedTask,
			});
		});
	});

	describe('getAll', () => {
		it('should get all tasks for user', async () => {
			const mockTasks = [
				{ _id: '1', title: 'Task 1', userId: 'test-user-id', __v: 0 },
				{ _id: '2', title: 'Task 2', userId: 'test-user-id', __v: 0 },
			] as (Document<unknown, {}, Task> &
				Task &
				Required<{ _id: unknown }> & { __v: number })[];
			jest.spyOn(taskService, 'getAllTask').mockResolvedValue(mockTasks);

			await getAll(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(taskService.getAllTask).toHaveBeenCalledWith('test-user-id');
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockJson).toHaveBeenCalledWith({
				success: true,
				data: mockTasks,
			});
		});
	});

	describe('getId', () => {
		it('should get task by id', async () => {
			const taskId = '1';
			mockReq.params = { id: taskId };

			const mockTask = {
				_id: taskId,
				title: 'Task 1',
				userId: 'test-user-id',
				__v: 0,
			} as Document<unknown, {}, Task> &
				Task &
				Required<{ _id: unknown }> & { __v: number };
			jest.spyOn(taskService, 'getIdTask').mockResolvedValue(mockTask);

			await getId(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(taskService.getIdTask).toHaveBeenCalledWith(
				taskId,
				'test-user-id'
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockJson).toHaveBeenCalledWith({
				success: true,
				data: mockTask,
			});
		});
	});

	describe('remove', () => {
		it('should delete task successfully', async () => {
			const taskId = '1';
			mockReq.params = { id: taskId };

			jest.spyOn(taskService, 'deleteTask').mockResolvedValue(null);

			await remove(mockReq as AuthRequest, mockRes as Response, mockNext);return;
			expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
			expect(mockStatus).toHaveBeenCalledWith(200);
		});

		it('should handle task not found', async () => {
			const taskId = 'non-existent';
			mockReq.params = { id: taskId };

			jest.spyOn(taskService, 'deleteTask').mockRejectedValue(
				new Error('Task not found')
			);

			await remove(mockReq as AuthRequest, mockRes as Response, mockNext);
			expect(mockStatus).toHaveBeenCalledWith(500);
		});
	});
});
