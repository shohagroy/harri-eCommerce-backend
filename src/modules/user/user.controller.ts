import { RequestHandler } from "express";
import { createNewUserToDb } from "./user.service";

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
