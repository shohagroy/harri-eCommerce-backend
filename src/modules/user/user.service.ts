import { Types } from "mongoose";
import { IUser, InitialUser } from "./user.interface";

export const createNewUserToDb = async (data: InitialUser) => {
  const { email, password }: InitialUser = data;
  console.log(email, password);
};
