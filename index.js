require('dotenv').config()
require('dotenv')

const {sequelize} = require('./db')
const router = require('./routes/index')
const cors = require('cors')
const express = require('express')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
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

app.get('/', function (req, res) {
    res.send('succes')
})

