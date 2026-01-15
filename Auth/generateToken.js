const jwt=require('jsonwebtoken')

const generateToken={
    accessToken:(userData)=>{
            try {
                const token=jwt.sign({userData},process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
                return token
            } catch (error) {
                console.log(error) 
            }
    },
    refreshToken:(userData)=>{
            try {
                const token=jwt.sign({userData},process.env.REFRESH_SECRET_KEY,{expiresIn:'7d'})
                return token
            } catch (error) {
                console.log(error) 
            }    
    }
}

module.exports=generateToken