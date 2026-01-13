const uploadFiles = require("../cloudinary/helper")
const { asyncHandler, ApiError } = require("../middleware/ErrorHandler")
const Product = require("../model/productModel")

const productController = {

    addProduct: asyncHandler(async (req, res) => {
        const { name, price, inStock, brand, category, } = req.body

        if (!req.files) {
            throw new ApiError('please select atleast one product image', 400)
        }

        if (!name || !price || !inStock || !brand || !category) {
            throw new ApiError('all fields required', 400)
        }

        const existProduct = await Product.findOne({ name: name })

        if (existProduct) {
            throw new ApiError('product already added', 400)
        }

        const uploadPhotos = await uploadFiles(req.files)

        const photos = uploadPhotos.map((img) => ({
            public_id: img.public_id,
            secure_url: img.secure_url,
        }))

        const product = new Product({
            name, price, brand, category, inStock, photos: photos
        })
        await product.save()
        return res.status(200).json({ msg: 'product successfully added!' })
    }),

    updateProduct: asyncHandler(async (req, res) => {

        const productId = req.params.productId

        const updateProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })

        if (!updateProduct) {
            throw new ApiError('failed to update product', 400)
        }
        return res.status(200).json({ msg: 'product successfully updated!' })
    }),

    deleteProduct: asyncHandler(async (req, res) => {
        const productId = req.params.productId

        const deleteProduct = await findByIdAndDelete(productId)

        if (!deleteProduct) {
            throw new ApiError('failed to delete product', 400)
        }
        return res.status(200).json({ msg: 'product successfully deleted!' })
    }),

    getProducts: asyncHandler(async (req, res) => {
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
        const search = req.query.search

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ]
        }

        const products = await Product.find(query).sort(sortOption).skip(skip).limit(limit)

        if (products.length === 0) {
            throw new ApiError('products not available', 400)
        }
        return res.status(200).json({ length: products.length, status: true, result: products })
    })
}


module.exports = productController