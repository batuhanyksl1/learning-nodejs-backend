import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

const userService = new UserService(new UserRepository());

export class UserController {
  
  static createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  };

  static getMe = async ( req: Request, res: Response) => 
    res.json({
      user: req.user
    })

  static getUser = async ( req: Request, res: Response) => 
    res.json({
      user: req.user
    })
}
