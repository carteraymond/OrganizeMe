
import Category from '../models/category';  // Import the Category model
import { ICategory } from '../models/category';  // Import the ICategory interface

// 1. Create Category Service
const createCategory = async (name: string, colorHex: string, userId: string) => {
  try {
    // Create a new category instance
    const newCategory = new Category({
      name,
      colorHex,
      userId,
    });

    // Save the new category to the database
    await newCategory.save();
    console.log('Category created:', newCategory);
    return newCategory;
  } catch (err) {
    console.error('Error creating category:', err);
    throw new Error('Failed to create category');
  }
};

// 2. Update Category Service
/*const updateCategory = async (id: string, name?: string, colorHex?: string) => {
  try {
    const updateFields: { [key: string]: any } = {};
    if (name) updateFields.name = name;
    if (colorHex) updateFields.colorHex = colorHex;

    // Update category by ID
    const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, { new: true });
    console.log('Category updated:', updatedCategory);
    return updatedCategory;
  } catch (err) {
    console.error('Error updating category:', err);
    throw new Error('Failed to update category');
  }
};*/

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

// 4. Get Category by ID
/*const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      console.log('Category not found');
      return null;
    }
    console.log('Category found:', category);
    return category;
  } catch (err) {
    console.error('Error finding category by ID:', err);
    throw new Error('Failed to fetch category');
  }
};*/

// 5. Get All Categories
const getAllCategories = async () => {
  try {
    const categories = await Category.find({});
    console.log('Categories found:', categories);
    return categories;
  } catch (err) {
    console.error('Error finding all categories:', err);
    throw new Error('Failed to fetch categories');
  }
};

export {
  createCategory,
  deleteCategory,
  getAllCategories,
};
