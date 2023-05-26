import { Document, model, Model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: [];
  publish: boolean;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  icon: {
    type: [Object],
    required: true,
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Category: Model<ICategory> = model<ICategory>("Category", categorySchema);

export default Category;
