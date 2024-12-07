import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getIdTask,
  updateTask,
} from "../services/taskService";

const create = async (req: Request, res: Response) => {
  try {
    const newTask = await createTask(
      req.body.title,
      req.body.description,
      req.body.dueDate,
      req.body.status,
      req.body.priority,
      req.body.userId,
      req.body.tags,
      req.body.categoryId
    );
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send({ error: "Failed to create task" });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const updatedTask = await updateTask(
      req.body.title,
      req.body.description,
      req.body.status,
      req.body.tags
    );
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send({ error: "Failed to update task" });
  }
};
const getAll = async (req: Request, res: Response) => {
  try {
    const getAll = await getAllTask();
    res.send(getAll);
  } catch (error) {
    res.status(500).send({ error: "Failed to get all tasks" });
  }
};

const getId = async (req: Request, res: Response) => {
  try {
    const getId = await getIdTask(req.body.id);
    res.send(getId);
  } catch (error) {
    res.status(500).send({ error: "Failed to get task" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const deletedTask = await deleteTask(req.body.id);
    if (deletedTask != null) {
      res.send({ message: "Task Deleted" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete task" });
  }
};

export { create, update, getAll, getId, remove };
