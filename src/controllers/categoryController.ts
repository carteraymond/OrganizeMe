import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from '../services/categoryService';

// Create Category Controller
const createCategoryController = async (req: Request, res: Response) => {
  const { name, colorHex, userId } = req.body;

  // Log the data being passed in the request body
  console.log({ name, colorHex, userId });
  
  // Validate required fields
  if (!name || !colorHex || !userId) {
    res.status(400).json({ error: 'Missing required fields: name, colorHex, and userId' });
    return;
  }

  try {
    const newCategory = await createCategory(name, colorHex, userId);
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    return;
  }
};

// Delete Category Controller
export const deleteCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate ID
  //if (!mongoose.Types.ObjectId.isValid(id)) {
    //res.status(400).json({ error: 'Category not found' });
  //}

  try {
    const deletedCategory = await deleteCategory(id);
    console.log('Deleted Category:', deletedCategory); 

    if (!deletedCategory) {
      console.warn(`Category with ID ${id} not found.`);
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Category not found' });
    //next(err);
  }
};

// Get All Categories Controller
const getAllCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      message: 'Categories retrieved successfully',
      categories,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  createCategoryController,
  //deleteCategoryController,
  getAllCategoriesController,
};
