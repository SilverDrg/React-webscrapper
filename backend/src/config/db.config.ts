import { Dialect } from "sequelize";

export default {
    HOST: "db",
    USER: "postgres",
    PASSWORD: "example",
    DB: "reactwebscrapper",
    dialect: "postgres" as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };