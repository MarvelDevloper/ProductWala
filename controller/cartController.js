const { asyncHandler, ApiError } = require("../middleware/ErrorHandler")
const Cart = require("../model/cartModel")

const cartController = {
    addtoCart: asyncHandler(async (req, res) => {
        const userId = req.userid
        const { items } = req.body

        if (!userId) {
            throw new ApiError('userId not found', 400)
        }

        const existCart = await Cart.findOne({ userId: userId })

        if (existCart) {
            items.forEach(product => {
                const index = existCart.items.findIndex((existProduct) => {
                    return (existProduct.productId.toString() === product.productId.toString())
                })
                if (index > -1) {
                    existCart.items[index].quantity += product.quantity
                    existCart.items[index].price = product.price
                } else {
                    existCart.items.push(product)
                }
            });

            const totalPrice = existCart.items.reduce((acc, product) => {
                return acc = acc + (product.quantity * product.price)
            }, 0)


            existCart.totalPrice = totalPrice

            existCart.save()

            return res.status(200).json({ msg: 'product added to cart' })
        }
        const totalPrice = items.reduce((acc, product) => {
            return acc = (product.quantity * product.price) + acc
        }, 0);

        const cart = new Cart({
            userId,
            items,
            totalPrice
        })
        await cart.save()
        return res.status(200).json({ msg: 'product added to cart', price: totalPrice })
    }),
    removeFromCart: asyncHandler(async (req, res) => {
        const productId = req.params.productId
        const userId = req.userid

        const existCart = await Cart.findOne({ userId: userId })

        if (!existCart) {
            throw new ApiError('cart not found', 400)
        }

        const index = existCart.items.findIndex((product) => {
            return (product.productId.toString() === productId.toString())
        })

        if (index > -1) {
            existCart.items.splice(index, 1)
            const totalPrice=existCart.items.reduce((acc,product)=>{
                return acc=acc+(product.price*product.quantity)
            },0)
            existCart.totalPrice=totalPrice
            existCart.save()
            return res.status(200).json({ msg: 'product remove from the product list' })
        } else {
            throw new ApiError('product not found in productList!')
        }
    }),
     updateCart: asyncHandler(async (req, res) => {
        const productId = req.params.productId
        const userId = req.userid
        const {quantity}=req.body

        const existCart = await Cart.findOne({ userId: userId })

        if (!existCart) {
            throw new ApiError('cart not found', 400)
        }

        const index = existCart.items.findIndex((product) => {
            return (product.productId.toString() === productId.toString())
        })

        if (index > -1) {
            existCart.items[index].quantity=parseInt(quantity)

            const totalPrice=existCart.items.reduce((acc,product)=>{
                return acc=acc+(product.quantity*product.price)
            },0)

            existCart.totalPrice=parseInt(totalPrice)
            existCart.save()
            return res.status(200).json({ msg: 'product updated from the product list'})
        } else {
            throw new ApiError('product not found in productList!')
        }
    })
}


module.exports = cartController