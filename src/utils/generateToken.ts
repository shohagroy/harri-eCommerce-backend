import { IUser } from "../modules/user/user.interface";

const jwt = require("jsonwebtoken");

const generateToken = (userInfo: IUser) => {
  const { firstName, role, email, _id } = userInfo;
  const payload = {
    firstName,
    role,
    email,
    _id,
  };

  const token = jwt.sign(payload, process.env.SECTECT_TOKEN_KEY, {
    expiresIn: "10H",
  });

  return token;
};

export default generateToken;
