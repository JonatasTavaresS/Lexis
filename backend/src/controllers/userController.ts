import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserRole } from "../models/User";

const userService = new UserService();

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password, role } = req.body;

            if (!Object.values(UserRole).includes(role)) {
                res.status(400).json({ message: "Invalid role" });
            } else {
                const user = await userService.createUser(firstName, lastName, email, password, role);
                res.status(201).json(user);
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: "Error retrieving users", error: error.message });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getUser(id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    }

    static async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { firstName, lastName, email, password, role } = req.body;

            if (role && !Object.values(UserRole).includes(role)) {
                res.status(400).json({ message: "Invalid role" });
            } else {
                const user = await userService.updateUser(id, { firstName, lastName, email, password, role });

                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error updating user", error: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await userService.deleteUser(id);

            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    }
}
