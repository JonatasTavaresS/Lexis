import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { BookCopy } from './BookCopy';
import { User } from './User';

export enum LoanStatus {
    PENDING = 'PENDING',
    RETURNED = 'RETURNED',
}

interface LoanAttributes {
    id: number;
    bookCopyId: number;
    userId: number;
    loanDate: Date;
    returnDate: Date;
    status: LoanStatus;
}

interface LoanCreationAttributes extends Optional<LoanAttributes, 'id'> { }

export class Loan extends Model<LoanAttributes, LoanCreationAttributes> implements LoanAttributes {
    public id!: number;
    public bookCopyId!: number;
    public userId!: number;
    public loanDate!: Date;
    public returnDate!: Date;
    public status!: LoanStatus;

    public readonly bookCopy?: BookCopy;

    public readonly user?: User;
}

Loan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookCopyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book_copies',
                key: 'id',
            },
            field: 'book_copy_id',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            field: 'user_id',
        },
        loanDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'loan_date',
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'return_date',
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(LoanStatus),
            allowNull: false,
            defaultValue: LoanStatus.PENDING,
        },
    },
    {
        sequelize,
        tableName: 'loans',
        timestamps: false,
    }
);

Loan.belongsTo(BookCopy, {
    foreignKey: 'bookCopyId',
    as: 'bookCopy',
});

Loan.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
