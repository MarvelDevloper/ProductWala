const express=require('express')
const cartController = require('../controller/cartController')
const { verifyAccessToken } = require('../Auth/verifyToken')
const cartRoute=express.Router()

cartRoute.post('/add',verifyAccessToken,cartController.addtoCart)
cartRoute.delete('/remove/:productId',verifyAccessToken,cartController.removeFromCart)
cartRoute.patch('/update/:productId',verifyAccessToken,cartController.updateCart)

module.exports=cartRoute