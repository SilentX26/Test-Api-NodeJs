const bcrypt = require('bcryptjs')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const seed = async () => {
    await prisma.users.upsert({
        where: { email: 'randika.rosyid2@gmail.com' },
        update: {},
        create: {
            email: 'randika.rosyid2@gmail.com',
            password: bcrypt.hashSync('password'),
            name: 'Admin Randika',
            role: 'admin'
        }
    })


}

seed().then( async () => {
    console.log('Database seed successfully!')
    await prisma.$disconnect()

}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })