const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    totalPrice: {
        type: Number,
        default:0
    }
},
    {
        timestamps: true
    })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart