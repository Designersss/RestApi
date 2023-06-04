require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT
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


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Стартовал порт ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()