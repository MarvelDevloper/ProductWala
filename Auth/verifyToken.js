const jwt = require('jsonwebtoken')
const { accessToken } = require('./generateToken')
require('dotenv').config()

const verifyToken = {

    verifyAccessToken: (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ msg: 'unauthorized error or inavlid token' })
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.log(err)
            }
            req.userid = user.userData.id
            req.email = user.userData.email
            req.role = user.userData.role
            next()
        })
    },
    verifyRefreshToken: (req, res, next) => {
        try {
            const token = req.cookies.refreshtoken || req.headers.authorization.split(' ')[1]

            // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjY5NjkxMjg5ZThjNzYyN2RmOGYwOGI3NyIsImVtYWlsIjoiZDIwMjUuc2Fuc2thci5zYW5hc0B2ZXMuYWMuaW4iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3Njg0OTQxNTcsImV4cCI6MTc2OTA5ODk1N30.GckK9WOs5s3AshNHi5qzsD4IL5raol4ARllobS9sUWc' for practice checking purpose
            if (!token) {
                return res.status(401).json({ msg: 'unauthorized request invalid token or token not found' })
            }

            jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(401).json({ msg: 'unauthorized token expire' })
                }
                const access = accessToken({
                    id: user.userData.id,
                    email: user.userData.email,
                    role: user.userData.role
                })
                return res.status(200).json({ token: access })
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json({ msg: 'unauthorized token expire' })
        }
    }
}

module.exports = verifyToken