const mongoose = require('mongoose')


// register
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})

const users = mongoose.model("users",userSchema)

module.exports = users


// Login

