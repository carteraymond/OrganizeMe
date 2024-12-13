import User from '../models/user';
import Category from '../models/category';  // Import the Category model
import { ICategory } from '../models/category';  // Import the ICategory interface

// 1. Create Category Service
const createCategory = async (name: string, colorHex: string, githubId: string) => {
  try {
    const user = await User.findOne({ githubId });
    if (!user) {
      throw new Error('User not found');
    }
    // Create a new category instance
    const newCategory = new Category({
      name,
      colorHex,
      userId: user._id,
    });

    // Save the new category to the database
    await newCategory.save();
    console.log('Category created:', newCategory);
    return newCategory;
  } catch (err) {
    console.error('Error creating category:', err);
    throw err;
  }
};

// 2. Update Category Service
const updateCategory = async (id: string, name: string, colorHex: string, githubId: string) => {
  try {
    // First find the user to get their _id
    const user = await User.findOne({ githubId });
    if (!user) {
      throw new Error('User not found');
    }

    // Find and update the category, ensuring it belongs to the user
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, userId: user._id },
      { name, colorHex },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      console.log('No category found to update');
      return null;
    }

    console.log('Category updated:', updatedCategory);
    return updatedCategory;
  } catch (err) {
    console.error('Error updating category:', err);
    throw new Error('Failed to update category');
  }
};

// 3. Delete Category Service
const deleteCategory = async (id: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      console.log('No category found to delete');
      return null;
    }
    console.log('Category deleted:', deletedCategory);
    return deletedCategory;
  } catch (err) {
    console.error('Error deleting category:', err);
    throw new Error('Failed to delete category');
  }
};

// 4. Get Category by ID Service
const getCategoryById = async (id: string, githubId: string) => {
  try {
    // First find the user to get their _id
    const user = await User.findOne({ githubId });
    if (!user) {
      throw new Error('User not found');
    }

    // Find the category, ensuring it belongs to the user
    const category = await Category.findOne({ _id: id, userId: user._id });
    
    if (!category) {
      console.log('No category found');
      return null;
    }

    console.log('Category found:', category);
    return category;
  } catch (err) {
    console.error('Error finding category:', err);
    throw new Error('Failed to find category');
  }
};

// 5. Get All Categories
const getAllCategories = async (githubId: string) => {
  try {
    const user = await User.findOne({ githubId });
    if (!user) {
      throw new Error('User not found');
    }

    const categories = await Category.find({ userId: user._id });
    console.log('Categories found:', categories);
    return categories;
  } catch (err) {
    console.error('Error finding all categories:', err);
    throw err;
  }
};

export {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
};