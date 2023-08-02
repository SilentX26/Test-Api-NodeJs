const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const userController = require('./controllers/userController.js')
const loginController = require('./controllers/loginController.js')
const authUser = require('./middleware/authUser.js')

app.use(`/api/users`, authUser)
app.use(express.json())

app.post('/api/login', loginController.login)

app.get('/api/users', userController.getUser)
app.post('/api/users', userController.createUser)
app.get('/api/users/:id', userController.detailUser)
app.delete('/api/users/:id', userController.deleteUser)

const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => console.log('Server is running on port ' + SERVER_PORT))