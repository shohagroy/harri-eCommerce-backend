import { Document, model, Model, Schema } from "mongoose";

export interface IWIshList extends Document {
  title: string;
  images: string;
  unit: string;
  quantity: number;
  price: number;
  totalPrice: number;
  productId: string;
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
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    price: {
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
      id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
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
