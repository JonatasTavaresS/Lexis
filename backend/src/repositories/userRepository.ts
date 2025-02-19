import { User, UserRole } from "../models/User";

export class UserRepository {

    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: UserRole
    ) {
        return await User.create({
            firstName,
            lastName,
            email,
            password,
            role
        });
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getUser(id: number) {
        return await User.findByPk(id);
    }

    async getUserByEmail(email: string) {
        return await User.findOne({
            where: { email }
        });
    }

    async updateUser(
        id: number,
        data: Partial<{
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            role: UserRole;
        }>
    ) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.update(data);
        }
        return null;
    }

    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.destroy();
        }
        return null;
    }
}
