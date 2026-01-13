const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(401).json({msg:'unauthorized error or inavlid token'})
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err)
        }
        req.userid=user.id
        req.email=user.email
        req.role=user.role
        next()
    })
}

module.exports=verifyToken