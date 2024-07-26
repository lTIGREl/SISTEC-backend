import { DataSource } from "typeorm";
import mysql from "mysql2/promise";

export async function createDatabase() {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Admin12345_",
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS sistec`);
    await connection.end();
}
export async function createTables() {
    myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized temporal!")
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





