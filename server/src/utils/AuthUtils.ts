import { User } from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = "8996c4e5-308b-4284-a119-671707fe4e0c";

const JWT_REFRESH_SECRET = "647c6a33-6c31-4b09-805a-82ae78f9522e";

export const generateTokens = (user: User) => {
    const accessToken = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({id: user.id, email: user.email}, JWT_REFRESH_SECRET, {expiresIn: '7d'});

    return { accessToken, refreshToken };
}