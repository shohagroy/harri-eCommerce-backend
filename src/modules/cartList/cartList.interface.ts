import { Document, model, Model, Schema, Types } from "mongoose";

export interface ICartProduct extends Document {
  title: string;
  images: string;
  unit: string;
  price: number;
  discount: number;
  totalPrice: number;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
}

const cartListSchema: Schema<ICartProduct> = new Schema<ICartProduct>(
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

const CartListProduct: Model<ICartProduct> = model<ICartProduct>(
  "CartListProduct",
  cartListSchema
);

export default CartListProduct;
