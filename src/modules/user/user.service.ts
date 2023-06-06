import { Types } from "mongoose";
import { createUserToFirebase } from "../../utils/firebase";
import User, { IUser, InitialUser } from "./user.interface";

export const createNewUserToDb = async (data: InitialUser) => {
  const newUser = (await createUserToFirebase(data)) as IUser;

  if (!newUser?.uid) {
    return {
      status: "fail",
      message: "Email address already in use another user!",
    };
  }

  const response = await User.create(newUser);

  const { _id, uid, email } = response;

  return {
    status: "success!",
    message: "User Create Successfully!!",
  };
};
