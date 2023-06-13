import { Document, model, Model, Schema, Types } from "mongoose";

export interface IWIshList extends Document {
  title: string;
  images: string;
  unit: string;
  price: number;
  discount: number;
  totalPrice: number;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
}

const wishListSchema: Schema<IWIshList> = new Schema<IWIshList>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    images: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishListProduct: Model<IWIshList> = model<IWIshList>(
  "WishListProduct",
  wishListSchema
);

export default WishListProduct;
