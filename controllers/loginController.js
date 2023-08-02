const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email) {
        return res.status(400).json({ error: 'Email field is required' })
    } else if(!password) {
        return res.status(400).json({ error: 'Password field is required' })
    }

    const dataUser = await prisma.users.findFirst({
        where: { email: email }
    })

    if(!dataUser) {
        return res.status(400).json({ error: 'Email is not registered.' })
    } else if(!bcrypt.compareSync(password, dataUser.password)) {
        return res.status(400).json({ error: 'Password is not valid.' })

    } else {
        const payload = { user_id: dataUser.user_id, role: dataUser.role }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `60 minutes` })
        
        res.status(200).json({
            data: {
                access_token: accessToken,
                expires_in: 3600,
            }
        })
    }
}

module.exports = { login }