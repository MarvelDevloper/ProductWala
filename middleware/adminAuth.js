const { ApiError } = require("./ErrorHandler")

const adminAuth=(req,res,next)=>{
    const role=req.role

    if(!role){
        throw new ApiError('token is expired maybe',401)
    }

    if(role==='admin'){
        next()
    }else{
        throw new ApiError(`you are not allowed to perform this action`,401)
    }
}

module.exports=adminAuth