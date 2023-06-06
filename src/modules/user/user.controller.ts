import { Request, Response } from "express";
import { errorHandelar } from "../../utils/globalErrorHandelar";
import User, { InitialUser } from "./user.interface";
import { createNewUserToDb } from "./user.service";

export const createNewUser = async (req: Request, res: Response) => {
  const { password, confirmPassword }: InitialUser = req.body;

  if (password !== confirmPassword) {
    return res.status(201).json({
      status: "success",
      message: "Password did not match!",
    });
  }
  try {
    const user = await createNewUserToDb(req.body);
    res.status(200).json(user);
  } catch (error) {
    errorHandelar(res, error);
  }
};
