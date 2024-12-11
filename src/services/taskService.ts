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
    const newTask = new Task({
        title,
        description,
        dueDate,
        status,
        priority,
        userId,
        tags,
        categoryId,
    });

    try {
        const task = await newTask.save();
        console.log('Task created:', task);
        return task;  // return the saved task directly
    } catch (err) {
        console.error(err);
        return undefined;  // return undefined if save fails
    }
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

    try {
        const result = await Task.updateOne({ _id: id }, { $set: updateFields });
        if (result.modifiedCount > 0) {
            const updatedTask = await Task.findById(id);  // get the updated task after modifying
            console.log('Task updated:', updatedTask);
            return updatedTask;
        } else {
            console.log('No task was updated');
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

const deleteTask = async (id: string) => {
    try {
        const result = await Task.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            console.log('Task deleted:', id);
            return { message: "Task successfully deleted" };
        } else {
            console.log('No task found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
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