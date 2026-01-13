const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:[4,'password is weak keep it strong']
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema)

module.exports=User