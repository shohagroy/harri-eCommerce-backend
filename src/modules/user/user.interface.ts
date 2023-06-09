import { Document, model, Model, Schema } from "mongoose";

export type InitialUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface IUser extends Document {
  googleId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  verified: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    googleId: String,
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      required: true,
      lowercase: true,
    },
    verified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
