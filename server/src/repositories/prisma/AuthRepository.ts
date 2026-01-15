import prisma from "../../db/prisma";
import { IAuthRepository } from "../../models/IAuthRepository";
import { User } from "../../models/User";

class AuthRepository implements IAuthRepository {

    async register(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                active: user.active
            }
        })

        return createdUser
    }


    async  getByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async getById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user;
    }
}

export default AuthRepository;