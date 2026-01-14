import { User } from "./User";

export interface IAuthRepository {
    register(user: User): Promise<User>;
    login(user: User): Promise<User>;
    logout(user: User): Promise<User>;

    getByEmail(email: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;
}