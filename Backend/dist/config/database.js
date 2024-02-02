"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    database: "indt-users",
    username: "root",
    password: "root",
    host: "db",
    port: 3306,
    dialect: "mysql",
    logging: false,
});
