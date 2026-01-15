
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = () => (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) res.status(401).json({message: "Não autorizado"});

    const token = authHeader && authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);
        if(decoded) {
            (req as any).user = decoded;

            next();
        }
    } catch (error: any) {
        console.log(error.message)
        return res.status(403).json({message: error.message});
    }
} 