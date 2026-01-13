const express=require('express')
const DBconnection = require('./DBconnection')
const { globalErrorHandler } = require('./middleware/ErrorHandler')
const apiLimit = require('./middleware/apiLimit')
const userRoute = require('./route/userRoute')
const productRoute = require('./route/productRoute')
const cartRoute = require('./route/cartRoute')
const orderRoute = require('./route/orderRoute')
const app=express()
require('dotenv').config()


// DB connection 
DBconnection()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(apiLimit(100,15*60*1000))

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/order',orderRoute)
app.use('/cart',cartRoute)
app.use(globalErrorHandler)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Server Started")
})