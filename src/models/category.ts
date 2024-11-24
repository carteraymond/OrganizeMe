import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  colorHex: string;
  userId: string;
}


const categorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  colorHex: { type: String },
  userId: { type: String, required: true },
}, { collection: 'categories' });
  
  const category = mongoose.model<ICategory>('Category', categorySchema);
  
  export default category;
