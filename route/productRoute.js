const express=require('express')
const productController = require('../controller/productController')
const verifyToken = require('../middleware/verifyToken')
const adminAuth = require('../middleware/adminAuth')
const productRoute=express.Router()
const multer=require('multer')

const upload=multer({
    limits:{fileSize:500000},
    storage:multer.diskStorage({})
})


productRoute.post('/add',verifyToken,adminAuth,upload.array('photos',5),productController.addProduct)
productRoute.delete('/delete/:productId',verifyToken,adminAuth,productController.deleteProduct)
productRoute.patch('/update/:productId',verifyToken,adminAuth,productController.updateProduct)
productRoute.get('/getAll',verifyToken,adminAuth,productController.getProducts)

module.exports=productRoute