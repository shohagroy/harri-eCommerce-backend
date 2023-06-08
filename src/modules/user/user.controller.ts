import { RequestHandler } from "express";
import { createNewUserToDb } from "./user.service";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await createNewUserToDb(req.body);

    res.status(201).json({
      status: "success",
      message: "Category Create Successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
