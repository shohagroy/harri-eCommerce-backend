import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

import env from "../configs/env.config";
import ApiError from "../errors/ApiError";
import handleValidationError from "../errors/handleValidationError";
import { IGenericErrorMessage } from "../inferfaces/error";
import { errorLogger } from "../shared/loggar";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  env.DEVELOPMENT === "development" &&
    console.log(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env.DEVELOPMENT === "development" ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
