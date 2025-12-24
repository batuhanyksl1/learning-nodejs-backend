import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validator";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthController } from "./auth.controller";


export const authRoutes = Router();

authRoutes.post(
    "/register",
    validate(registerSchema),
    asyncHandler(AuthController.register)
)

authRoutes.post(
    "/login",
    validate(loginSchema),
    asyncHandler(AuthController.login)
)   