import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { env } from "../config";
import { Role } from "../constants/roles";
import { AppError } from "../errors/AppError";

type JwtPayload = {
  id: string;
  email: string;
  role: Role
};

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError("Token expired", 401);
    }
    if (error instanceof JsonWebTokenError) {
      throw new AppError("Invalid token", 401);
    }
    // Diğer beklenmeyen hatalar için
    throw new AppError("Token verification failed", 401);
  }
};
