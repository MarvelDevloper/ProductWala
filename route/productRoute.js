const express=require('express')
const productController = require('../controller/productController')
const adminAuth = require('../middleware/adminAuth')
const productRoute=express.Router()
const multer=require('multer')
const { verifyAccessToken } = require('../Auth/verifyToken')

const upload=multer({
    limits:{fileSize:500000},
    storage:multer.diskStorage({})
})


productRoute.post('/add',verifyAccessToken,adminAuth,upload.array('photos',5),productController.addProduct)
productRoute.delete('/delete/:productId',verifyAccessToken,adminAuth,productController.deleteProduct)
productRoute.patch('/update/:productId',verifyAccessToken,adminAuth,productController.updateProduct)
productRoute.get('/getAll',verifyAccessToken,adminAuth,productController.getProducts)

module.exports=productRoute