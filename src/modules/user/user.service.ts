import ApiError from "../../errors/ApiError";
import { InitialUser } from "./user.interface";

export const createNewUserToDb = async (userInfo: InitialUser) => {
  const { email, password, confirmPassword } = userInfo;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password mismatch");
  }
};
