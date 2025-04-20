require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const bodyparser = require('body-parser')
// const Razorpay = require('razorpay')


const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(bodyparser.json())
require('./mongodb/mongodb')

// Before app.listen()
const fs = require('fs');
if (!fs.existsSync('orders.json')) {
  fs.writeFileSync('orders.json', JSON.stringify([]));
}


// const razorpay = new Razorpay({
//     key_id: process.env.Razor_pay_key_id,
//     key_secret : process.env.Razor_pay_key_secret
// })

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>
    console.log(`server connected successfully ${PORT}`)
    
)

app.get('/',(req,res)=>{
    res.send(`connected on port ${PORT}`)
})

app.post('/',(req,res)=>{
    res.send(`POST REQUEST`)
})