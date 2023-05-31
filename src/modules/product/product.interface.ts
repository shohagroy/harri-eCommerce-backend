import { Document, model, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  images: string[];
  category: { name: string; id: string };
  unit: string;
  quantity: number;
  price: number;
  discount: number;
  tags: string[];
  description: string;
  publish: boolean;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  images: {
    type: [Object],
    required: true,
  },
  category: {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  unit: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
    min: 0,
  },
  tags: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Product: Model<IProduct> = model<IProduct>("Product", productSchema);

export default Product;
