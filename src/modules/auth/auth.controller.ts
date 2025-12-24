import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

const authService = new AuthService(new UserRepository());

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  };

  static login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  };
}
