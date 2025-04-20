const Razorpay = require('razorpay');


const razorpay = new Razorpay({
  key_id: process.env.Razor_pay_key_id,
  key_secret: process.env.Razor_pay_key_secret
});

module.exports = razorpay
