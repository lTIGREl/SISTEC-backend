import { DataSource } from "typeorm";
import mysql from "mysql2/promise";
require('dotenv').config();

export async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB}`);
    await connection.end();
}
export async function createTables() {
    myDataSource
    .initialize()
    .then(() => {
        //console.log("Data Source has been initialized temporal!")
        return myDataSource.destroy();
    })
    .catch((err) => {
        //console.error("Error during Data Source initialization:", err)
    });
}
const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    "password": "Admin12345_",
    "database": "sistec",
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
    logging: false,
});





