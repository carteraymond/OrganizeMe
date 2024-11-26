import Task from '../models/task';


const createTask = async (
    title: string,
    description: string,
    dueDate: Date,
    status: string,
    priority: number,
    userId: string,
    tags: string,
    categoryId: string,
    ) =>  {
    
    // for now we have userId and categoryId null until we figure out how to connect them 
    const newTask = new Task({
        title: title,
        description: description,
        dueDate: dueDate,
        status: null,
        priority: priority,
        userId: null,
        tags: tags,
        categoryId: null,
    });

    // Save new Task Model
    let isSaved = false;
    await newTask.save()
    .then(task => {
        console.log('Task created:', task);
        isSaved = true;
    })
    .catch(err => console.error(err));
    
    if (isSaved) return newTask;
    else return undefined;
};

const updateTask = async (
    id: string,
    title?: string, 
    description?: string,
    status?: string,
    tags?: string
) =>  {
    // Construct the update object dynamically
    let updateFields: { [key: string]: string | undefined } = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
    if (tags) updateFields.tags = tags;

    // Save new Task Model
    let isSaved = false;
    let updatedTask = await Task.updateOne({ _id: id }, { $set: updateFields }) 
    .then(task => {
        console.log('Task updated:', task);
        isSaved = true;
    })
    .catch(err => console.error(err));
    
    if (isSaved) return updatedTask;
    else return undefined;
};

const deleteTask = async (id: string) => {
    let isDeleted = false;
    let deletedTask = await Task.deleteOne({ _id: id })
    .then(result => {
        if (result.deletedCount > 0) {
            console.log('task deleted:', result);
            isDeleted = true;
        } else {
            console.log('No task found with the given ID.');
        }
    })
    .catch(err => console.error(err));
    
    if (isDeleted) return deletedTask;
    else return undefined;
};

const getIdTask = async (id: string) => {
    try {
        const task = await Task.findById(id);
        if (task) {
            console.log('Task found:', task);
            return task;
        } else {
            console.log('No task found with the given ID.');
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

const getAllTask = async () => {
    try {
        const task = await Task.find({});
        if (task.length > 0) {
            console.log('Task found:', task);
            return task;
        } else {
            console.log('No task found.');
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
};


export {
    createTask,
    updateTask,
    deleteTask,
    getIdTask,
    getAllTask
}