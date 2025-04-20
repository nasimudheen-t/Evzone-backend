const events = require('../models/eventModel')

// create event

exports.createEvent =async (req,res)=>{
  const{title,description,date,location,price,category} = req.body
  console.log(req.body);
 try{
  const existingEvent = await events.findOne({title})
  if(existingEvent){
    res.status(404).json("The Place is already booked")
    
  }else{
    const newEvent = new events({
      title,description,date,location,price,category,
    })
    await newEvent.save()
    res.status(200).json(newEvent)
  }
 }catch(err){
  res.status(401).json(err)
 }
}


// update event

exports.updateEvent =async(req,res)=>{
  const{title,description,date,location,price,category} = req.body
  const {id} = req.params
  try{
    const updateEvent = await events.findByIdAndUpdate(id,{
      title,description,date,location,price,category
    },{new:true})
    res.status(200).json(updateEvent)
  }catch(err){
    res.status(401).json(err)
  }
}

// get all event

exports.getAllEvents = async (req,res)=>{

 

  try{
    const allEventList = await events.find()
    res.status(200).json(allEventList)
  }catch(err){
    res.status(401).json(err)
  }
}

// delete events 

exports.deleteEvents = async (req,res)=>{
  const{id} = req.params
  try{
 const deletEvent = await events.findByIdAndDelete(id)
 res.status(200).json({deletEvent,message:"event deleted"})
  }catch(err){
    res.status(401).json(err)
  }
}


// Seach Event

exports.searchEvent = async (req,res)=>{
  const {keyword} = req.query
  try{
    const search = await events.find({
      $or :[
        {title: {$regex : keyword,$options:'i'}},
        {location: {$regex : keyword,$options:'i'}},
        {category: {$regex : keyword,$options:'i'}},
        {date: {$regex : keyword,$options:'i'}},
        {price: {$regex : keyword,$options:'i'}}
      ]
    })
    res.status(200).json(search)
     }catch(err){
       res.status(401).json({message:"Search Failed",err})
     }
}

// get event by id

exports.getEventById = async (req,res)=>{
  const {id} = req.params
  try{
  const getEvent = await events.findById(id)
  if(!getEvent){
   return res.status(404).json("Event is missing")
  }
  res.status(200).json(getEvent)
  }catch(err){
    res.status(401).json(err)
  }
}
