import jwt from "jsonwebtoken";
import { env } from "../config";

type JwtPayload = {
  id: string;
  email: string;
};

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};
