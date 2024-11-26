import mongoose, { Document, Schema } from 'mongoose';


export interface Task extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: number;
  userId: string;
  tags: string;
  categoryId: string;
}
// for now we will have userId and categoryId not required as we do not have them implemented and tied into task creation.
const TaskSchema: Schema = new Schema({
    title: { type: String, required: true,},
    description: { type: String, required: true },
    dueDate: { type: Date, default: Date.now, required: false },
    status: { type: String, required: false },
    priority: { type: Number, default: 1},
    userId: { type: String, required:false },
    tags: { type: String, required:false },
    categoryId: { type: String, required:false },
 }, { collection: 'tasks' });
  
  const Task = mongoose.model<Task>('Task', TaskSchema);
  
  export default Task;
