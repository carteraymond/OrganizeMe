import mongoose, { Document, Schema } from 'mongoose';


export interface Task extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  userId: string;
  tags: string;
  categoryId: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: Date.now },
  status: { type: String, required: false },
  priority: { type: String, required: false },
  userId: { type: String, required: true },
  tags: { type: [String], required: false },
  categoryId: { type: String, required: false },
}, { collection: 'tasks' });


  const Task = mongoose.model<Task>('Task', TaskSchema);
  
  export default Task;
