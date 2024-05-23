require('dotenv').config()

const {sequelize} = require('./db')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const cors = require('cors')
const express = require('express')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router) // Добавляю префікс, тепер всі роути будуть починатись з префікса /api/
app.use(errorMiddleware) //middleware для обробки помилок




const PORT = process.env.PORT || 3000

const connect = async () => {
  try {
    app.listen(PORT)
    await sequelize.authenticate();
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect()
