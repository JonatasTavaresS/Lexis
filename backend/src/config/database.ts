import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dbName = process.env.NODE_ENV === 'test' ? 'test_db' : process.env.DB_NAME;

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: dbName,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
    define: {
        underscored: true,
        freezeTableName: true,
    }
});

export default sequelize;
