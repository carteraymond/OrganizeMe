import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  colorHex: string;
  userId: string;
}


const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  colorHex: { 
    type: String,
    default: '#000000',
    validate: {
      validator: (v: string) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(v),
      message: (props) => `${props.value} is not a valid hex color!`,
    },
   },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { collection: 'categories', timestamps: true });


categorySchema.pre('save', async function (next) {
  try {
    // Check if the userId exists in the User collection
    const userExists = await mongoose.model('User').exists({ _id: this.userId });

    if (!userExists) {
      // If the user does not exist, throw an error
      throw new Error('Referenced User does not exist');
    }

    // Proceed with saving the category if user exists
    next();
  } catch (error) {
    next(error);  // Pass any errors to the next
  }
});


// Define a compound index for unique (name, userId) combinations
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

  
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
