require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const bodyParser = require("body-parser");

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, 'staticUsers')))
app.use(express.static(path.resolve(__dirname, 'staticServices')))
app.use(express.static(path.resolve(__dirname, 'tracksFile')))
app.use(fileUpload());
app.use('/api', router)
app.use(errorHandler)

const PORT = process.env.PORT || 3030;

const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const SQL = postgres(URL, { ssl: 'require' });


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Стартовал порт ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()