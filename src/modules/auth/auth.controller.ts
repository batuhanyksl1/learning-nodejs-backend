import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthService } from "./auth.service";

const authService = container.resolve(AuthService);

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
