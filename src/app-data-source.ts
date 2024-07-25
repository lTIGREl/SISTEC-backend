import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    "password": "Admin12345_",
    "database": "SISTEC",
    entities: ["src/entities/**/*.ts"],
    logging: true,
    synchronize: true,
})