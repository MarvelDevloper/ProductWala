const express=require('express')
const userController = require('../controller/userController')
const userRoute=express.Router()
const verifyToken=require('../middleware/verifyToken')

userRoute.post('/signup',userController.signup)
userRoute.post('/login',userController.login)
userRoute.post('/change-password',verifyToken,userController.changePassword)
userRoute.get('/get-profile',verifyToken,userController.profile)

module.exports=userRoute