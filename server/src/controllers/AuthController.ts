import AuthService from "../services/AuthService";
import { Request, Response } from "express";
import { User } from "../models/User";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;


class AuthController {
    constructor(private readonly authService: AuthService) {}

    register = async (req: Request, res: Response) => {
        try {
            const { tokens, user } = await this.authService.register(req.body as User);

            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: SEVEN_DAYS,
                sameSite: "strict",
            })


            return  res.status(201).json({ accessToken: tokens.accessToken, user });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}



export default AuthController;