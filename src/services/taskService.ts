import Task from '../models/task';
import mongoose from 'mongoose';

const createTask = async (
    title: string,
    description: string,
    dueDate: Date,
    status: string,
    priority: string,
    userId: string,
    tags: string[],
    categoryId?: string
) => {
    const newTask = new Task({
        title,
        description,
        dueDate,
        status,
        priority,
        userId,
        tags,
        categoryId
    });

    try {
        const savedTask = await newTask.save();
        console.log('Task created:', savedTask);
        return savedTask;
    } catch (err) {
        console.error('Error creating task:', err);
        throw err;
    }
};

const updateTask = async (
    id: string,
    title?: string, 
    description?: string,
    status?: string,
    tags?: string[],
    categoryId?: string | null
) => {
    try {
        // Create update object
        const updateFields: { [key: string]: any } = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (status) updateFields.status = status;
        if (tags) updateFields.tags = tags;
        if (categoryId !== undefined) {
            updateFields.categoryId = categoryId === null ? null : new mongoose.Types.ObjectId(categoryId);
        }

        // Update task and populate category details
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { $set: updateFields },
            { new: true }
        ).populate({
            path: 'categoryId',
            select: 'name colorHex'
        });
        
        return updatedTask;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err;
    }
};


const deleteTask = async (id: string) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
    } catch (err) {
        console.error('Error deleting task:', err);
        throw err;
    }
};

const getIdTask = async (id: string) => {
    try {
        const task = await Task.findById(id);
        return task;
    } catch (err) {
        console.error('Error finding task:', err);
        throw err;
    }
};


const getAllTask = async (userId: string) => {
    try {
        // Return tasks for the specific user and populate category details
        const tasks = await Task.find({ userId })
            .populate({
                path: 'categoryId',
                select: 'name colorHex' // Only select the fields we need
            });
        return tasks;
    } catch (err) {
        console.error('Error finding tasks:', err);
        throw err;
    }
};

export {
    createTask,
    updateTask,
    deleteTask,
    getIdTask,
    getAllTask
};