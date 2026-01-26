import AuthService from "../services/AuthService";
import { Request, Response } from "express";
import { User } from "../models/User";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;


class AuthController {
    constructor(private readonly authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        try {
            const { tokens, user } = await this.authService.register(req.body as User);

            res.cookie("accessToken", tokens.accessToken, {
               httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: SEVEN_DAYS,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: SEVEN_DAYS,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })


            return  res.status(201).json({ user });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { tokens, user } = await this.authService.login(req.body as User);

             res.cookie("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: SEVEN_DAYS,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })
            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: SEVEN_DAYS,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })


            return  res.status(201).json({ user });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
            
        }
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie("accessToken", {
           httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: SEVEN_DAYS,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: SEVEN_DAYS,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        return res.status(200).json({ message: "Logout realizado com sucesso." });
    }

    refresh = async (req: Request, res: Response) => {
        try {
            const token = req.cookies.refreshToken;

            const { accessToken, refreshToken}  = await this.authService.refreshToken(token);
            
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: SEVEN_DAYS,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })

            return res.status(200).json({ accessToken });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Não foi possível atualizar o token." });
        }
    }

    me = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;

            const user = await this.authService.me(userId);
            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Não foi possível obter o usuário." });
        }
    }
}



export default AuthController;