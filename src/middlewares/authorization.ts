import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import { IUser } from "../modules/user/user.interface";

const authorization =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    try {
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ApiError(400, "You are not authorized for this role!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default authorization;
