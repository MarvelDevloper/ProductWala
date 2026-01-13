const express=require('express')
const orderController = require('../controller/orderController')
const verifyToken = require('../middleware/verifyToken')
const adminAuth = require('../middleware/adminAuth')
const orderRoute=express.Router()



orderRoute.post('/add',verifyToken,orderController.confirmOrder)
orderRoute.get('/get',verifyToken,adminAuth,orderController.getallOrders)
orderRoute.patch('/update/:orderId',verifyToken,adminAuth,orderController.updateOrder)

module.exports=orderRoute