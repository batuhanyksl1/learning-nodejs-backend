import jwt from "jsonwebtoken";
import { env } from "../config";
import { Role } from "../constants/roles";

type JwtPayload = {
  id: string;
  email: string;
  role: Role
};

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};
