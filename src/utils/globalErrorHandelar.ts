import { Response } from "express";

export const errorHandelar = (res: Response, error: any) => {
  res.status(500).json({
    message: "Something went wrong",
    error,
  });
};
