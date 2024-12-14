import { Request, Response, RequestHandler } from "express";
import {
    createTask,
    deleteTask,
    getAllTask,
    getIdTask,
    updateTask,
} from "../services/taskService";
import { AuthRequest } from './authController';


// Get userId from either session or API token
const getUserId = (req: Request): string | null => {
    // If using API token find the user object that the auth middleware attached
    if ((req as any).user) {
        return (req as any).user.id.toString();
    }
    // If using session just get the user object from the session
    const userReq = req as AuthRequest;
    return userReq.session?.user?.id.toString() || null;
};


// Use the RequestHandler type to define the controller functions bc ts sucks
const create: RequestHandler = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const newTask = await createTask(
            req.body.title,
            req.body.description,
            req.body.dueDate,
            req.body.status,
            req.body.priority,
            userId,
            req.body.tags,
            req.body.categoryId
        );
        
        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ 
            error: "Failed to create task",
            details: (error as Error).message 
        });
    }
};

const update: RequestHandler = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const updatedTask = await updateTask(
            req.params.id,
            req.body.title,
            req.body.description,
            req.body.dueDate,
            req.body.status,
            req.body.tags,
            req.body.categoryId
        );

        if (!updatedTask) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        res.json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ 
            error: "Failed to update task",
            details: (error as Error).message 
        });
    }
};

const getAll: RequestHandler = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const tasks = await getAllTask(userId);
        res.json({
            message: 'Tasks retrieved successfully',
            tasks: tasks
        });
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ 
            error: "Failed to get tasks",
            details: (error as Error).message 
        });
    }
};

const getId: RequestHandler = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const task = await getIdTask(req.params.id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({
            message: 'Task retrieved successfully',
            task: task
        });
    } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ 
            error: "Failed to get task",
            details: (error as Error).message 
        });

    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const deletedTask = await deleteTask(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({
            message: 'Task deleted successfully',
            task: deletedTask
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ 
            error: "Failed to delete task",
            details: (error as Error).message 
        });
    }
};
export { create, update, getAll, getId, remove };

