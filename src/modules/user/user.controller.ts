import { RequestHandler } from "express";
import passport from "passport";
import { IUser } from "./user.interface";
import {
  createNewUserToDb,
  fintLoginUserToDb,
  updateUserInfoToDb,
} from "./user.service";
import generateToken from "../../utils/generateToken";
import googleConfig from "../../configs/google.config";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await createNewUserToDb(req.body);
    const token = await generateToken(user);

    res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      user: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    (error: Error, user: IUser, info: Function) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email or Password Incorrect!" });
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json({ message: "Something went Wrong!" });
        }

        const token = generateToken(user);

        user.password = "";

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
        res.status(201).json({
          status: "success",
          message: "User Login Successfully!",
          user: user,
          token,
        });
      });
    }
  )(req, res, next);
};

export const findLoginUser: RequestHandler = async (req, res, next) => {
  const user: any = req.user;

  try {
    const loginUser = await fintLoginUserToDb(user?._id);
    res.status(200).json({
      status: "success",
      message: "user get successfully!",
      data: loginUser,
    });
  } catch (error) {
    next(error);
  }
};

export const userLoginWithGoogle: RequestHandler = async (req, res, next) => {
  const { clientID, callbackURL } = googleConfig;
  const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;

  res.status(200).json({
    status: "success",
    message: "google auth url",
    data: authenticationURL,
  });
};

export const userLogout: RequestHandler = async (req, res, next) => {
  console.log("user logged out");
  res.status(200).json({
    status: "success",
    message: "user logout successfully",
  });
};

export const updateUserInfo: RequestHandler = async (req, res) => {
  const user: any = req.user;
  const payload: IUser = req.body;

  const response = await updateUserInfoToDb(user._id, payload);
  res.status(200).json({
    status: "success",
    message: "User Information Updated!",
    data: response,
  });
};
