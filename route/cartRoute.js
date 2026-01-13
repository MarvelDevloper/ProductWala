const express=require('express')
const cartController = require('../controller/cartController')
const verifyToken = require('../middleware/verifyToken')
const cartRoute=express.Router()

cartRoute.post('/add',verifyToken,cartController.addtoCart)
cartRoute.delete('/remove/:productId',verifyToken,cartController.removeFromCart)
cartRoute.patch('/update/:productId',verifyToken,cartController.updateCart)

module.exports=cartRoute