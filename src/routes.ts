import { Router } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

export const routes = Router();

routes.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

routes.use("/user", userRoutes);

routes.use("/auth", authRoutes)