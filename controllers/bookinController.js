const path = require('path');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const crypto = require('crypto')
const razorpay = require('../utilities/razorpay')
const {readData , writeData} = require('../utilities/fileHandles')
const bookingUser = require('../models/eventBooking')


// Create Order
exports.paymentRazorpay = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

   
    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
    });
    writeData(orders);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
};

// Verify Payment
exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  // Secret key from your Razorpay dashboard
  const secret = process.env.Razor_pay_key_secret;

  // Concatenate order_id and payment_id to form the body for signature verification
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  console.log('Received order_id:', razorpay_order_id);
console.log('Received payment_id:', razorpay_payment_id);
console.log('Received signature:', razorpay_signature);
console.log('Body for signature validation:', body);


  try {
    // Validate the signature received in the request with the Razorpay secret key
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);

    if (isValidSignature) {
      // Signature is valid, update the order status to 'paid' or do further processing
      const orders = readData();
      const order = orders.find(o => o.order_id === razorpay_order_id);

      if (order) {
        order.status = 'paid';  // Mark order as paid
        order.payment_id = razorpay_payment_id;  // Store the payment ID
        writeData(orders);  // Update the orders in the file
      }
      
      // Respond with status 'ok' indicating successful verification
      res.status(200).json({ status: 'ok' });
    } else {
      // If the signature is invalid, send an error response
      res.status(400).json({ status: 'verification_failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
};


// booked user data

exports.bookedUserData = async(req,res)=>{

  console.log(req.body);
  
  try{
    const { eventTitle, user, bookingStatus, date } = req.body;
   const newBooking = new bookingUser({eventTitle, user, bookingStatus,date})
   await newBooking.save()
   res.status(200).json({status:"ok",message:"booking saved"})
  }catch(err){
    console.error("Booking Error:", err); // log the actual error
    res.status(500).json({ status: "error", message: "Booking failed", error: err.message })
  }
}


// get all booked user

exports.getAllBookeduser = async(req,res)=>{
  try{
     const bookedUsers = await bookingUser.find()
     res.status(200).json(bookedUsers)
  }catch(err){
    res.status(401).json(err)
  }
}