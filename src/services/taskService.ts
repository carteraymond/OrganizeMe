import Task from '../models/task';


const createTask = async (
    title: string,
    description: string,
    dueDate: Date,
    status: string,
    priority: string,
    userId: string,
    tags: string,
    categoryId: string,
    ) =>  {
    
    // for now we have userId and categoryId null until we figure out how to connect them 
    const newTask = new Task({
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
        priority: priority,
        userId: userId,
        tags: tags,
        categoryId: categoryId,
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
    priority?: string,
    dueDate?: Date,
    tags?: string[]
) => {
    try {
        // Construct the update object dynamically
        const updateFields: { [key: string]: any } = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (status !== undefined) updateFields.status = status;
        if (priority !== undefined) updateFields.priority = priority;
        if (dueDate !== undefined) updateFields.dueDate = dueDate;
        if (tags !== undefined) updateFields.tags = tags;

        // Find the task and update it
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            console.log('No task found with the given ID.');
            return null;
        }

        console.log('Task updated:', updatedTask);
        return updatedTask;
    } catch (err) {
        console.error('Error updating task:', err);
        throw err;
    }
};

const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const result = await Task.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            console.log('Task deleted:', result);
            return true;
        } else {
            console.log('No task found with the given ID.');
            return false;
        }
    } catch (err) {
        console.error('Error deleting task:', err);
        throw err;
    }
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

const getAllTask = async (userId: string) => {
    try {
        const task = await Task.find({ userId: userId });
        if (task.length > 0) {
            console.log('Tasks found:', task);
            return task;
        } else {
            console.log('No tasks found for this user.');
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