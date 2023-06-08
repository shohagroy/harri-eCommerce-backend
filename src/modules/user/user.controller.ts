import { RequestHandler } from "express";
import { createNewUserToDb } from "./user.service";

export const createNewUser: RequestHandler = async (req, res, next) => {
  console.log(req.body);
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
