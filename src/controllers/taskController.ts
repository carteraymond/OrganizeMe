import { Request, Response } from 'express';
import { CustomRequest } from './authController';
import * as TaskService from '../services/taskService';

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: Function) => {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

export const createTask = async (req: CustomRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.session.user?.id.toString();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const task = await TaskService.createTask(title, userId, description, dueDate);
    
    if (task) {
      res.status(201).json(task);
    } else {
      res.status(400).json({ error: 'Failed to create task' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTasks = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.session.user?.id.toString();
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tasks = await TaskService.getUserTasks(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.session.user?.id.toString();
    const taskId = req.params.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const task = await TaskService.getTaskById(taskId, userId);
    
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.session.user?.id.toString();
    const taskId = req.params.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const task = await TaskService.updateTask(taskId, userId, req.body);
    
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.session.user?.id.toString();
    const taskId = req.params.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const success = await TaskService.deleteTask(taskId, userId);
    
    if (success) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
