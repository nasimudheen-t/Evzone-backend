const mongoose = require('mongoose')

const bookingShcema = new mongoose.Schema({
    eventTitle:{
        type:String,
        required:true
    }, 
    user:{
        type:String,
        required:true
    },
    bookingStatus:{
        type:Boolean,
        default:false
    },
    date:{
       type:Date
    },
    bookedDay: {
        type: Date,
        default: Date.now
      }
})

const booking = mongoose.model('booking',bookingShcema)
module.exports = booking