import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getIdTask,
  updateTask,
} from "../services/taskService";

const create = async (req: Request, res: Response) => {
  // Get the current user's ID from the session
  try {
    const userId = (req as any).session.user.id.toString();
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
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send({ error: "Failed to create task" });
  }
};

const update = async (taskId: string, taskData: any) => {
  try {
    const updatedTask = await updateTask(
      taskId,
      taskData.title,
      taskData.description,
      taskData.status,
      taskData.priority,
      taskData.dueDate,
      taskData.tags
    );
    return updatedTask;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).session.user.id.toString();
    const tasks = await getAllTask(userId);
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Failed to get all tasks" });
  }
};

const getId = async (req: Request, res: Response) => {
  try {
    const task = await getIdTask(req.params.id);
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to get task" });
  }
};

const remove = async (id: string): Promise<any> => {
  try {
    const deletedTask = await deleteTask(id);
    return deletedTask;
  } catch (error) {
    throw error;
  }
};

export { create, update, getAll, getId, remove };