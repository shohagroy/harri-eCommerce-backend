import ApiError from "../../errors/ApiError";
import User, { IUser, InitialUser } from "./user.interface";
import bcrypt from "bcrypt";
import uploadImages from "../../utils/uploadImages";

export const createNewUserToDb = async (userInfo: InitialUser) => {
  const { email, password, confirmPassword } = userInfo;

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password did not Match!");
  }
  const alreadyRegistered = await User.findOne({ email: email });

  if (!alreadyRegistered) {
    const newUser = {
      firstName: "",
      lastName: "",
      avatar: "",
      email: email,
      password: bcrypt.hashSync(password, 10),
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      role: "user",
      verified: false,
      wishList: [],
      cartList: [],
      buyerList: [],
    };

    const createUser = await User.create(newUser);
    createUser.password = "";

    return createUser;
  } else {
    throw new ApiError(400, "Email is Already Registered!");
  }
};

export const fintLoginUserToDb = async (id: any) => {
  const response = await User.findById(id).select("-password");

  return response;
};

export const updateUserInfoToDb = async (_id: string, payload: IUser) => {
  const imageData = [payload?.avatar];
  const avatar = await uploadImages(imageData);

  const updatedData = { ...payload, avatar: avatar[0].url };

  const result = await User.findByIdAndUpdate({ _id }, updatedData);

  return result;
};

export const getAllUserToDb = async () => {
  const response = await User.find();

  return response;
};
