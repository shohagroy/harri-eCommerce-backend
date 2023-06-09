import ApiError from "../../errors/ApiError";
import User, { InitialUser } from "./user.interface";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken";

export const createNewUserToDb = async (userInfo: InitialUser) => {
  const { email, password, confirmPassword } = userInfo;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password did not Match!");
  }

  const newUser = {
    googleId: "",
    firstName: "",
    lastName: "",
    avatar: "",
    email: email,
    password: bcrypt.hashSync(password, 10),
    phone: "",
    address: "",
    role: "user",
    verified: false,
  };

  const createUser = await User.create(newUser);
  const token = await generateToken(createUser);

  return token;
};
