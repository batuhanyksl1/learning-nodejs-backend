import { Request, Response } from "express";
import { UserService } from "./user.service";
import { container } from "tsyringe";

const userService = container.resolve(UserService);

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  };

  static getMe = async (req: Request, res: Response) =>
    res.json({
      user: req.user,
    });

  static getUser = async (req: Request, res: Response) =>
    res.json({
      user: req.user,
    });

  static setRole = async (req: Request, res: Response) => {
    const updatedUser = await userService.setRole(req.body);
    res.status(200).json({
      message: "Role updated successfully",
      updatedUser,
      
    });
  };
              
  static getAllUsers = async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  };

  static listUsers = async (req: Request, res: Response) => {
    const result = await userService.listUsers(req.query as any);
    res.json(result);
  };
}
