import { IAuthRepository } from "../models/IAuthRepository";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import { generateTokens } from "../utils/AuthUtils";
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
        user.id = uuid();

        const registeredUser = await this.authRepository.register(user);

        const { accessToken, refreshToken}  = generateTokens(registeredUser);

        return {
            user: {
                id: registeredUser.id,
                email: registeredUser.email,
                name: registeredUser.name,
            },
            tokens: {
                accessToken,
                refreshToken
            }
        };
    }

}

export default AuthService;