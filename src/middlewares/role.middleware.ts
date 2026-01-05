import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { Role } from "../constants/roles";

export const authorize =
  (allowedRoles: Role[]) =>
  (req: Request, _: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
