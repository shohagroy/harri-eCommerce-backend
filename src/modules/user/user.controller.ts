import { RequestHandler } from "express";
import { createNewUserToDb } from "./user.service";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const token = await createNewUserToDb(req.body);

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
};
