import { Document, model, Model, Schema } from "mongoose";

export type Image = {
  url: string;
  id: string;
};

export interface IProduct extends Document {
  title: string;
  images: Image[] | string[];
  category: { name: string; id: string };
  unit: string;
  quantity: number;
  price: number;
  discount: number;
  tags: string;
  description: string;
  publish: boolean;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>(
  {
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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = model<IProduct>("Product", productSchema);

export default Product;

export type IProductFilters = {
  searchTerm?: string;
  sortBy?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  category?: string;
};
