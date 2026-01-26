
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AuthService from "../services/AuthService";
import AuthRepository from "../repositories/prisma/AuthRepository";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const authService = new AuthService(new AuthRepository());

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies.accessToken);
    const accessToken = req.cookies.accessToken;

    if(!accessToken) {
        return res.status(401).json({message: "Acesso negado. Token não fornecido."});
    }

    try {
        const decoded = jwt.verify(accessToken as string, JWT_SECRET);
        if(decoded) {
            (req as any).user = decoded;

            next();
        }
    } catch (error: any) {
        console.log(error.name)
        if(error.name === "TokenExpiredError") {

            const refreshToken = req.cookies.refreshToken;

            if(!refreshToken) {
                return res.status(401).json({message: "Sessão expirada. Faça login novamente."});
            }

            try {
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await authService.refreshToken(refreshToken);

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: SEVEN_DAYS,
                    sameSite: "strict",
                })
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: SEVEN_DAYS,
                    sameSite: "strict",
                })

                const decodedNew = jwt.verify(newAccessToken as string, JWT_SECRET);
                if(decodedNew) {
                    (req as any).user = decodedNew;
                    next();
                }
            } catch (error) {
                console.log(error);
                return res.status(401).json({message: "Sessão expirada. Faça login novamente 2."});
            }
        }
        return res.status(403).json({message: "Token inválido"});
    }
} 