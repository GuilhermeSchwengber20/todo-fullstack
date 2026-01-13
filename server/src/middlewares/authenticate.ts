
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "8996c4e5-308b-4284-a119-671707fe4e0c";

export const authenticate = () => (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) res.status(401).json({message: "Não autorizado"});

    
} 