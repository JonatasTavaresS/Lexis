import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword:
    string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, email: string): string => {
    return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
