const mongoose = require('mongoose')
const { defaultMaxListeners } = require('nodemailer/lib/xoauth2')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    totalPrice:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:['pending','completed','dispatched'],
        default:'pending'
    }
},{
    timestamps:true
})

const Order=mongoose.model('Order',orderSchema)

module.exports=Order