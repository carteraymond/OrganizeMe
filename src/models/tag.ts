import mongoose, { Document, Schema } from 'mongoose';

export interface Tag extends Document {
  tags: string[];
}

const TagSchema: Schema = new Schema({
  tags: { type: [String], required: false },
}, { collection: 'tags' });

const Tag = mongoose.model<Tag>('Tags', TagSchema);

export default Tag;