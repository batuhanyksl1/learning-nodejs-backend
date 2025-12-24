import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "node:crypto";
import { verifyToken } from "../utils/jwt";


export const authMiddleware = (req: Request, _:Response, next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        throw new AppError("Unauthorized", 401)
    } 

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded

    next()


}