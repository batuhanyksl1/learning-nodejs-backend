import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema } from "./user.validator";
import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRoutes = Router();

userRoutes.post(
  "/createUser",
  validate(createUserSchema),
  asyncHandler(UserController.createUser)
);

userRoutes.get("/getMe",
    authMiddleware,
    asyncHandler(UserController.getMe)
);

userRoutes.get("/getUser",
  authMiddleware,
  asyncHandler(UserController.getUser)
)