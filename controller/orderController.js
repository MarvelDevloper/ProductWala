const { asyncHandler, ApiError } = require('../middleware/ErrorHandler')
const Cart = require('../model/cartModel')
const Order = require('../model/orderModel')
const sendEmail = require('../nodemailer')

const orderController = {
    confirmOrder: asyncHandler(async (req, res) => {
        const userId = req.userid
        const existCart = await Cart.findOne({ userId: userId })


        if (existCart.length === 0 || !existCart) {
            throw new ApiError('Cartlist is empty', 404)
        }

        const order = new Order({
            userId: userId,
            items: existCart.items,
            totalPrice: existCart.totalPrice,
        })
        await order.save()

        const deleteCart = await Cart.findOneAndDelete({ userId: userId })
        console.log("cart deleted")
        return res.status(201).json({ msg: 'order placed!' })
    }),

    getallOrders: asyncHandler(async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const skip = (page - 1) * limit

        const sortOption = {}

        if (req.query.sort) {
            const sortField = (req.query.sort.startsWith('-') ? req.query.sort.substring(1) : req.query.sort)
            const sortOrder = (req.query.sort.startsWith('-') ? -1 : 1)
            sortOption[sortField] = sortOrder
        }

        const query = {}

        if (req.query.search) {
            query.$or = [
                { name: { gerex: req.query.name, options: 'i' } },
                { brand: { gerex: req.query.brand, options: 'i' } },
                { category: { gerex: req.query.category, options: 'i' } },
            ]
        }

        const orders = await Order.find(query).skip(skip).limit(limit).populate('items.productId').populate('userId')

        if (!orders || orders.length === 0) {
            throw new ApiError('no order found!', 400)
        }

        return res.status(200).json({ products: orders })
    }),
    
    updateOrder: asyncHandler(async (req, res) => {
        const orderId = req.params.orderId

        console.log(req.body.status.toString())

        if (req.body.status.toString() === 'completed') {


            const existOrder = await Order.findById(orderId)

            if (!existOrder) {
                throw new ApiError('order not found', 400)
            }

            await sendEmail({
                to: `${req.email}`,
                subject: 'Order Completed',
                text: 'Order Recieved Thanks for Choosing Us See You Next Time....!'
            })

            const deleteOrder = await Order.findByIdAndDelete(orderId)

            if (!deleteOrder) {
                throw new ApiError('failed to delete order!', 400)
            }
            return res.status(200).json({ msg: 'order recieved by user' })
        }
        const updateOrder = await Order.findByIdAndUpdate(orderId, updatedBody, { new: true })

        if (!updateOrder) {
            throw new ApiError('order dispatch action failed', 400)
        }

        await sendEmail({
            to: `${req.email}`,
            subject: 'Order Dispatch',
            text: 'Your Order is Dispatched from the office it waiting for you....!'
        })
        return res.status(200).json({ msg: 'order dispatched' })
    })
}


module.exports = orderController