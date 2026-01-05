import { Request, Router } from "express";
import { Response } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, listUsersSchema, updateUserRoleSchema } from "./user.validator";
import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { ROLES } from "../../constants/roles";

export const userRoutes = Router();

userRoutes.post(
  "/createUser",
  validate(createUserSchema),
  asyncHandler(UserController.createUser)
);

userRoutes.get("/getMe", authMiddleware, asyncHandler(UserController.getMe));

userRoutes.get(
  "/getUser",
  authMiddleware,
  asyncHandler(UserController.getUser)
);

userRoutes.get(
  "/admin-only",
  authMiddleware,
  authorize([ROLES.ADMIN]),
  asyncHandler((_req: Request, res: Response) => {
    res.json({ message: "Welcome admin" });
  })
);

userRoutes.get(
  "/getAllUsers",
  authMiddleware,
  authorize([ROLES.ADMIN]),
  asyncHandler(UserController.getAllUsers)
);

userRoutes.post(
  "/setRole",
  authMiddleware,
  authorize([ROLES.ADMIN]),
  validate(updateUserRoleSchema),
  asyncHandler(UserController.setRole)
);

userRoutes.get(
  "/",
  authMiddleware,
  authorize([ROLES.ADMIN]),
  validate(listUsersSchema),
  asyncHandler(UserController.listUsers)
);
