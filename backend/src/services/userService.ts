import bcrypt from 'bcryptjs';
import { UserRole } from "../models/User";
import { UserRepository } from "../repositories/userRepository";

const userRepo = new UserRepository();
const saltRounds = 10;

export class UserService {
    async createUser(firstName: string, lastName: string, email: string, password: string, role: UserRole) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await userRepo.createUser(firstName, lastName, email, hashedPassword, role);
    }

    async getAllUsers() {
        return await userRepo.getAllUsers();
    }

    async getUser(id: number) {
        return await userRepo.getUser(id);
    }

    async getUserByEmail(email: string) {
        return await userRepo.getUserByEmail(email);
    }

    async updateUser(id: number, data: Partial<{ firstName: string; lastName: string; email: string; password: string; role: UserRole }>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        return await userRepo.updateUser(id, data);
    }

    async deleteUser(id: number) {
        return await userRepo.deleteUser(id);
    }
}
