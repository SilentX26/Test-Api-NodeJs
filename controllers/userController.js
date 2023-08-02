const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUser = async (req, res) => {
    const allUsers = await prisma.users.findMany({
        select: {
            user_id: true,
            name: true,
            email: true,
            role: true,
        }
    })

    res.status(200).json({ data: allUsers })
}

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body
    if(!name) {
        return res.status(400).json({ error: 'Name field is required' })
    } else if(!email) {
        return res.status(400).json({ error: 'Email field is required' })
    } else if(!password) {
        return res.status(400).json({ error: 'Password field is required' })
    } else if(!role) {
        return res.status(400).json({ error: 'Role field is required' })
    } else if(role !== 'admin' && role !== 'user') {
        return res.status(400).json({ error: 'The role field can only be filled with admin or user' })
    
    } else {
        const checkEmail = await prisma.users.findFirst({
            where: { email: email }
        })

        if(checkEmail) {
            return res.status(400).json({ error: 'Email has been used' })
        }

        await prisma.users.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password),
                name: name,
                role: role   
            }
        })
        
        res.status(200).json({ data: 'Create user successfully.' })
    }
}

const detailUser = async (req, res) => {
    const id = Number(req.params.id)
    const dataUser = await prisma.users.findFirst({
        select: {
            user_id: true,
            name: true,
            email: true,
            role: true,
        },
        where: { user_id: id }
    })

    if(!dataUser) {
        res.status(404).json({ error: 'User not found' })
    } else {
        return res.status(200).json({ data: dataUser })
    }
}

const deleteUser = async (req, res) => {
    const id = Number(req.params.id)
    const executeDelete = await prisma.users.delete({
        where: { user_id: id }
    })

    if(!executeDelete) {
        res.status(404).json({ error: 'Failed to delete user' })
    } else {
        return res.status(200).json({ data: 'Delete user successfully.' })
    }
}

module.exports = {
    getUser,
    createUser,
    detailUser,
    deleteUser,
}