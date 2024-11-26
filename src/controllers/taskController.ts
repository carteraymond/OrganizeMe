import { Request, Response } from 'express';
import { createTask, deleteTask, getAllTask, getIdTask, updateTask } from '../services/taskService';


const create = async (req: Request, res: Response) => {  
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

    res.send(newTask);
};

const update = async (req: Request, res: Response) => {
    const updatedTask = await updateTask(req.body.title, req.body.description, req.body.status, req.body.tags);

    // Error Handling needed
    res.send(updatedTask);
};
const getAll = async (req: Request, res: Response) => {
    const getAll = await getAllTask();

    // Error Handling needed
    res.send(getAll);
};

const getId = async (req: Request, res: Response) => {
    const getId = await getIdTask(req.body.id);

    // Error Handling needed
    res.send(getId);
};

const remove = async (req: Request, res: Response) => {
    const deletedTask = await deleteTask(req.body.id);

    // Error Handling needed
    res.send(deletedTask);
};

export {
    create,
    update,
    getAll,
    getId,
    remove
}