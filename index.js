// import package yang diperlukan
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const userController = require('./controllers/userController.js')
const loginController = require('./controllers/loginController.js')
const authUser = require('./middleware/authUser.js')

// daftarkan middleware "authUser" untuk verifikasi access token user
app.use(`/api/users`, authUser)

// daftarkan package express json untuk menangkan request body dalam bentuk json
app.use(express.json())

// daftarkan routes
app.post('/api/login', loginController.login)

app.get('/api/users', userController.getUser)
app.post('/api/users', userController.createUser)
app.get('/api/users/:id', userController.detailUser)
app.delete('/api/users/:id', userController.deleteUser)

// jalankan server
const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => console.log('Server is running on port ' + SERVER_PORT))