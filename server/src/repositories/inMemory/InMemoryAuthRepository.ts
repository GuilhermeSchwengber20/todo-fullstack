import { IAuthRepository } from "../../models/IAuthRepository";
import { User } from "../../models/User";

class AuthRepository implements IAuthRepository{
    
    private _users: User[];
    constructor() {
        this._users = [];
    }

    async register(user: User): Promise<User> {
        this._users.push(user);

        return user;
    }

    async logout(user: User): Promise<User> {
        return user;
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await this._users.find(u => u.email === email) || null;

        return user;
    }

    async getById(id: string): Promise<User | null> {
        const user = await this._users.find(u => u.id === id) || null;
        return user;
    }

}

export default AuthRepository;