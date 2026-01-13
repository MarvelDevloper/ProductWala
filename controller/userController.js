const { asyncHandler, ApiError } = require("../middleware/ErrorHandler")
const User = require("../model/userModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    signup: asyncHandler(async (req, res) => {
        const { email, name, password, address, role } = req.body

        if (!email || !name || !password || !address) {
            throw new ApiError('all fields required', 400)
        }
        const existUser = await User.findOne({ email: email })

        if (existUser) {
            throw new ApiError('account already exist!', 400)
        }

        const hashpassword = await bcryptjs.hash(password, 10)

        const user = new User({
            name, email, password: hashpassword, address, role: role || 'user'
        })
        await user.save()

        return res.status(201).json({ msg: 'account created successfully!' })
    }),
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError('all fields required', 400)
        }
        const existUser = await User.findOne({ email: email })

        if (!existUser) {
            throw new ApiError('invalid password or email', 400)
        }

        const isValid = await bcryptjs.compare(password, existUser.password)

        if (!isValid) {
            throw new ApiError('invalid password or email', 400)
        }

        const token = await jwt.sign({ id: existUser._id, email: existUser.email, role: existUser.role }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).json({ msg: "login successful!", token: token })
    }),
    profile: asyncHandler(async (req, res) => {
        const userId = req.userid

        const existUser = await User.findById(userId)

        if (!userId) {
            throw new ApiError('userId not found', 400)
        }

        if (!existUser) {
            throw new ApiError('account not found', 400)
        }

        return res.status(200).json({ msg: existUser })
    }),
    changePassword:asyncHandler(async(req,res)=>{
        const {oldpassword,newpassword}=req.body

        if(!oldpassword || !newpassword){
            throw new ApiError('all fields required',400)
        }

        const userId=req.userid

        const existUser=await User.findById(userId)

        if(!existUser){
            throw new ApiError('user not found',400)
        }

        const isValid=await bcryptjs.compare(oldpassword,existUser.password)

        if(!isValid){
            throw new ApiError('invalid password',400)
        }

        const newhashPassword=await bcryptjs.hash(newpassword,10)

        existUser.password=newhashPassword
        await existUser.save()
        return res.status(200).json({msg:'password changed'})
    }),
}

module.exports = userController