import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "indt-users",
  username: "root",
  password: "root",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: true,
});