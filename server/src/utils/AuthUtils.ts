import { User } from "../models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

const JWT_REFRESH_SECRET = process.env.JWT_SECRET as string;

export const generateTokens = (user: User) => {
    const accessToken = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({id: user.id, email: user.email}, JWT_REFRESH_SECRET, {expiresIn: '7d'});

    return { accessToken, refreshToken };
}

export const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

        return decoded;

    } catch (error) {
        console.error("Erro ao verificar o refresh token:", error);
    }
}
