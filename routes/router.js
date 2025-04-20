const express = require('express')

const router = express.Router()

const userRegistercontroller = require('../controllers/userController')

const eventCreation = require('../controllers/eventController')

const bookingStatus = require('../controllers/bookinController')

// const admin = require('../controllers/admincontrollers')

const middlewares = require('../Midllewares/jwtMiddleware')







// register

router.post('/user-register',userRegistercontroller.userRegister)


// Login


router.post('/user-login',userRegistercontroller.userLogin)

// admin Login


// router.post('/admin-login',admin.adminLogin)


// create-event

router.post('/create-event',eventCreation.createEvent)

// update event

router.put('/update-event/:id',eventCreation.updateEvent)

// List events

router.get('/all-events',eventCreation.getAllEvents)

// delete event

router.delete('/delete-event/:id',eventCreation.deleteEvents)

// Booking event

// router.post('/event-booking',bookingStatus.eventBooking)


// search 

router.get('/search',eventCreation.searchEvent)

// get Eevent By Id
router.get('/get-event/:id',middlewares,eventCreation.getEventById)

// razorpay 

router.post('/order',bookingStatus.paymentRazorpay)

// verify payment

router.post('/verify-payment',bookingStatus.verifyPayment)

// add booked user
router.post('/add-bookeduser',bookingStatus.bookedUserData)


// add booked user
router.get('/booked-users',bookingStatus.getAllBookeduser)

module.exports = router