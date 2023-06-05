const {Sequelize} = require('sequelize')

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )



const postgres = require('postgres');
const url = require("url");
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// const sql = postgres(URL, { ssl: 'require' });


module.exports = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: "postgres",
        host: process.env.PGHOST,
        port: process.env.DB_PORT,
        uri: URL,
        dialectOptions: {
            ssl: {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
)
