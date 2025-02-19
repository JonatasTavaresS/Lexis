import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BookAttributes {
    id: number;
    isbn: string;
    title: string;
    authors: string[];
    publisher: string;
    publishedYear: number;
    language: string;
    genre: string[];
    coverImageUrl: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> { }

export class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!: number;
    public isbn!: string;
    public title!: string;
    public authors!: string[];
    public publisher!: string;
    public publishedYear!: number;
    public language!: string;
    public genre!: string[];
    public coverImageUrl!: string;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isbn: {
            type: DataTypes.STRING(13),
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authors: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publishedYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        genre: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        coverImageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'books',
        timestamps: false,
    }
);
