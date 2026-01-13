const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type: Number,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    photos: [
        {
            public_id: { type: String, required: true },
            secure_url: { type: String, required: true },
        }
    ]
},
    {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product