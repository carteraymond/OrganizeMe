import { Request, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from './authController';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from '../services/categoryService';

// Get userId from either session or API token
const getUserId = (req: Request | AuthRequest): string | null => {
    // If using API token, find the user object that the auth middleware attached
    if ((req as any).user) {
        return (req as any).user.id.toString();
    }
    // If using session, get the user object from the session
    const userReq = req as AuthRequest;
    return userReq.session?.user?.id.toString() || null;
};

// Create Category Controller
export const create: RequestHandler = async (req, res, next) => {
    const { name, colorHex } = req.body;
    
    // Get userId
    const userId = getUserId(req);
    if (!userId) {
        res.status(401).json({ 
            success: false,
            error: 'User not authenticated' 
        });
        return;
    }

    // Validate required fields
    if (!name || !colorHex) {
        res.status(400).json({ 
            success: false,
            error: 'Missing required fields: name and colorHex' 
        });
        return;
    }


    try {
        const newCategory = await createCategory(name, colorHex, userId);
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: newCategory,
        });
    } catch (error) {
        console.error('Error in createCategory:', error);
        res.status(400).json({
            success: false,
            error: (error as Error).message || 'Error creating category'
        });
    }
};

// Get All Categories Controller
export const getAll: RequestHandler = async (req, res, next) => {
    // Get userId
    const userId = getUserId(req);
    if (!userId) {
        res.status(401).json({ 
            success: false,
            error: 'User not authenticated' 
        });
        return;
    }

    try {
        const categories = await getAllCategories(userId);
        res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            categories,
        });
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        res.status(400).json({
            success: false,
            error: (error as Error).message || 'Error fetching categories'
        });
    }
};

// Delete Category Controller
export const remove: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    
    // Get userId
    const userId = getUserId(req);
    if (!userId) {
        res.status(401).json({ 
            success: false,
            error: 'User not authenticated' 
        });
        return;
    }

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ 
            success: false,
            error: 'Invalid category ID' 
        });
        return;
    }

    try {
        const deletedCategory = await deleteCategory(id);
        if (!deletedCategory) {
            res.status(404).json({ 
                success: false,
                error: 'Category not found' 
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            category: deletedCategory,
        });
    } catch (error) {
        console.error('Error in deleteCategory:', error);
        res.status(400).json({
            success: false,
            error: (error as Error).message || 'Error deleting category'
        });
    }
};