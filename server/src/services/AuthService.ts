import { IAuthRepository } from "../models/IAuthRepository";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { generateTokens, verifyRefreshToken } from "../utils/AuthUtils";
import { AuthTokens } from "../models/AuthTokens";


class AuthService {
    constructor(private readonly authRepository: IAuthRepository) {}

    async register(user: User): Promise<{user: Partial<User>, tokens: AuthTokens}> {
        
        const userExists = await this.authRepository.getByEmail(user.email);

        if (userExists) {
            throw new Error("Já existe um usuário com esse email.");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        user.password = hashedPassword;
        user.id = v4();

        const registeredUser = await this.authRepository.register(user);

        const { accessToken, refreshToken}  = generateTokens(registeredUser);

        return {
            user: {
                email: registeredUser.email,
                name: registeredUser.name,
            },
            tokens: {
                accessToken,
                refreshToken
            }
        };
    }

    async login(user: User): Promise<{user: Partial<User>, tokens: AuthTokens}> {
        const existingUser = await this.authRepository.getByEmail(user.email);
        if (!existingUser) {
            throw new Error("Credenciais inválidas.");
        }
        const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!passwordMatch) {
            throw new Error("Credenciais inválidas.");
        }
        const { accessToken, refreshToken}  = generateTokens(existingUser);
        
        return {
            user: {
                email: existingUser.email,
                name: existingUser.name,
            },
            tokens: {
                accessToken,
                refreshToken
            }
        };
    }

    async refreshToken(token: string): Promise<{accessToken: string, refreshToken: string}> {

        const decoded = verifyRefreshToken(token);

        const user = await this.authRepository.getById((decoded as any).id);

        if(!user) {
            throw new Error("Usuário não encontrado.");
        }


        const { accessToken, refreshToken}  = generateTokens(user);

        return {
            accessToken,
            refreshToken
        }
    }
        

}

export default AuthService;