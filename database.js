const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
// console.log(process.env.DB_NAME)

const config = {
  database: "crm_1",
  userName: "root",
  password: "admin",
  host: "localhost",
  port: "3306",
  name: "mysql",
};

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USERNAME,
  process.env.PASS,
  {
    host: process.env.HOST,
    dialect: process.env.DB_NAME,
    port: process.env.PORT,
  }
);

// const sequelize = new Sequelize(
//   config.database,
//   config.userName,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.name,
//     port: config.port,
//   }
// );



module.exports = sequelize;
