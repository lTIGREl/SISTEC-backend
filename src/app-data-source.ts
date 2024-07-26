import { DataSource } from "typeorm"
require("dotenv").config()
export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    entities: ["src/entities/**/*.ts"],
    synchronize: false,
    logging: false,
})

