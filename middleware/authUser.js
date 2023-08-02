const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({ error: 'Unaothorized.' })

    const accessToken = authHeader.split(' ')[1] ?? ''
    try {
        const payloadData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(payloadData.role !== 'admin') return res.status(403).json({ error: 'Not allowed.' })

    } catch(e) {
        return res.status(401).json({ error: 'Unaothorized.' })
    }

    next();
}

module.exports = authUser;