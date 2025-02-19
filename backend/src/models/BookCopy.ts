import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Book } from './Book';

export enum BookCopyStatus {
    AVAILABLE = 'AVAILABLE',
    BORROWED = 'BORROWED',
    RESERVED = 'RESERVED',
}

export enum BookCopyCondition {
    NEW = 'NEW',
    GOOD = 'GOOD',
    WORN = 'WORN',
    DAMAGED = 'DAMAGED',
}

interface BookCopyAttributes {
    id: number;
    bookId: number;
    status: BookCopyStatus;
    condition: BookCopyCondition;
    acquisitionDate: Date;
    location: string;
}

interface BookCopyCreationAttributes extends Optional<BookCopyAttributes, 'id'> { }

export class BookCopy extends Model<BookCopyAttributes, BookCopyCreationAttributes> implements BookCopyAttributes {
    public id!: number;
    public bookId!: number;
    public status!: BookCopyStatus;
    public condition!: BookCopyCondition;
    public acquisitionDate!: Date;
    public location!: string;
    public readonly book?: Book;
}

BookCopy.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: 'id',
            },
            field: 'book_id',
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(BookCopyStatus),
            allowNull: false,
            defaultValue: BookCopyStatus.AVAILABLE,
        },
        condition: {
            type: DataTypes.ENUM,
            values: Object.values(BookCopyCondition),
            allowNull: false,
            defaultValue: BookCopyCondition.GOOD,
        },
        acquisitionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'acquisition_date',
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'book_copies',
        timestamps: false,
    }
);

BookCopy.belongsTo(Book, {
    foreignKey: 'bookId',
    as: 'book',
});
