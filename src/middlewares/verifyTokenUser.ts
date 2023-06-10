import { RequestHandler } from "express";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
import envConfig from "../configs/env.config";

const verifiedLoginUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "user not login!",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      envConfig.SECTECT_TOKEN_KEY
    );
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifiedLoginUser;
