
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/AuthUtils";
import "dotenv/config";

import AuthService from "../services/AuthService";
import AuthRepository from "../repositories/prisma/AuthRepository";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const authService = new AuthService(new AuthRepository());

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) {
        return res.status(401).json({message: "Acesso negado. Token não fornecido."});
    }

    try {
        const decoded = verifyAccessToken(accessToken);
        if(decoded) {
            (req as any).user = decoded;

            return next();
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
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                })
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: SEVEN_DAYS,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                })

                const decodedNew = verifyAccessToken(newAccessToken);
                if(decodedNew) {
                    (req as any).user = decodedNew;
                    return next();
                }
            } catch (error) {
                console.log(error);
                return res.status(401).json({message: "Sessão expirada. Faça login novamente."});
            }
        }
        return res.status(403).json({message: "Token inválido"});
    }
} 