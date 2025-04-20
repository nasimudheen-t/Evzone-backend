const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    location:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    }

},{timestamps:true})

const event = mongoose.model("event",eventSchema)
module.exports = event