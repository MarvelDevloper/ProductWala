const mongoose=require('mongoose')

const DBconnection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/Productwala').then(()=>{console.log("DB connected")}).catch(()=>{console.log("DB connection Failed")})    
}

module.exports=DBconnection