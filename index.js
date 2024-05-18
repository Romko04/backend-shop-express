require('dotenv').config()
const sequelize = require('./db')

const express = require('express')

const app = express()


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
  res.send('Hello World')
})
