import Task, { ITask } from '../models/task';

export const createTask = async (
  title: string,
  userId: string,
  description?: string,
  dueDate?: Date
): Promise<ITask | null> => {
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      userId,
      completed: false
    });
    return await task.save();
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

export const getUserTasks = async (userId: string): Promise<ITask[]> => {
  try {
    return await Task.find({ userId });
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    return [];
  }
};

export const getTaskById = async (taskId: string, userId: string): Promise<ITask | null> => {
  try {
    return await Task.findOne({ _id: taskId, userId });
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
};

export const updateTask = async (
  taskId: string,
  userId: string,
  updates: Partial<ITask>
): Promise<ITask | null> => {
  try {
    return await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

export const deleteTask = async (taskId: string, userId: string): Promise<boolean> => {
  try {
    const result = await Task.deleteOne({ _id: taskId, userId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};