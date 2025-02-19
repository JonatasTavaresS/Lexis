import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export enum UserRole {
    ADMIN = 'ADMIN',
    LIBRARIAN = 'LIBRARIAN',
    USER = 'USER',
}

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.USER,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);
