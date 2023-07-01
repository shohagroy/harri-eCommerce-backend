import { Document, model, Model, Schema, Types } from "mongoose";

export interface ICheckout extends Document {
  userName: string;
  userId: Types.ObjectId;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  product: string;
  quantity: number;
  price: number;
  discount: number;
  shippingCharge: number;
  totalPrice: number;
  paymentMethod: string;
  delivary: string;
  status: boolean;
}

const checkoutSchema: Schema<ICheckout> = new Schema<ICheckout>(
  {
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    delivary: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CheckoutOrder: Model<ICheckout> = model<ICheckout>(
  "CheckoutOrder",
  checkoutSchema
);

export default CheckoutOrder;
