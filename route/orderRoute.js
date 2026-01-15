const express=require('express')
const orderController = require('../controller/orderController')
const adminAuth = require('../middleware/adminAuth')
const { verifyAccessToken } = require('../Auth/verifyToken')
const orderRoute=express.Router()



orderRoute.post('/add',verifyAccessToken,orderController.confirmOrder)
orderRoute.get('/get',verifyAccessToken,adminAuth,orderController.getallOrders)
orderRoute.patch('/update/:orderId',verifyAccessToken,adminAuth,orderController.updateOrder)

module.exports=orderRoute