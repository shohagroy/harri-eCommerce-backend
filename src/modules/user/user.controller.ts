import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IUser } from "./user.interface";

import generateToken from "../../utils/generateToken";
import googleConfig from "../../configs/google.config";
import { userServices } from "./user.service";
import catchAsync from "../../shared/catchAsync";

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createNewUserToDb(req.body);
  const token = await generateToken(user);

  res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);

  res.status(201).json({
    status: "success",
    message: "User created successfully!",
    user: user,
    token,
  });
});

const userLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    )(req, res);
  }
);

const findLoginUser = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const loginUser = await userServices.fintLoginUserToDb(user?._id);
  res.status(200).json({
    status: "success",
    message: "user get successfully!",
    data: loginUser,
  });
});

const userLoginWithGoogle = catchAsync(async (req: Request, res: Response) => {
  const { clientID, callbackURL } = googleConfig;
  const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;

  res.status(200).json({
    status: "success",
    message: "google auth url",
    data: authenticationURL,
  });
});

const userLogout = catchAsync(async (req: Request, res: Response) => {
  console.log("user logged out");
  res.status(200).json({
    status: "success",
    message: "user logout successfully",
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const payload: IUser = req.body;

  const response = await userServices.updateUserInfoToDb(user._id, payload);
  res.status(200).json({
    status: "success",
    message: "User Information Updated!",
    data: response,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const response = await userServices.getAllUserToDb();

  res.status(200).json({
    status: "success",
    message: "Users recvied Successfully!",
    data: response,
  });
});

export const userControll = {
  createNewUser,
  userLogin,
  userLoginWithGoogle,
  userLogout,
  updateUserInfo,
  getAllUsers,
  findLoginUser,
};
