import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../services/authService';
import { UserService } from '../services/userService';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userService = new UserService();
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user.id, user.email);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};
