const express=require('express')
const userController = require('../controller/userController')
const userRoute=express.Router()
const { verifyRefreshToken, verifyAccessToken } = require('../Auth/verifyToken')

userRoute.post('/signup',userController.signup)
userRoute.post('/login',userController.login)
userRoute.post('/change-password',verifyAccessToken,userController.changePassword)
userRoute.get('/get-profile',verifyAccessToken,userController.profile)
userRoute.get('/refresh-token',verifyRefreshToken)

module.exports=userRoute