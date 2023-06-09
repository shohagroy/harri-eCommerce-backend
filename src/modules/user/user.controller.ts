import { RequestHandler } from "express";
import passport from "passport";
import { IUser } from "./user.interface";
import { createNewUserToDb } from "./user.service";
import generateToken from "../../utils/generateToken";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const token = await createNewUserToDb(req.body);

    res.cookie("token", token, {
      maxAge: 2000000,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
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
        console.log("Authentication failed");
        return res
          .status(401)
          .json({ message: "Email or Password Incorrect!" });
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json({ message: "Something went Wrong!" });
        }

        const token = generateToken(user);
        res.status(201).json({
          status: "success",
          message: "User created successfully!",
          token,
        });
      });
    }
  )(req, res, next);
};
