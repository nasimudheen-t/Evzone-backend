const user = require('../models/userModel')
const jwt = require('jsonwebtoken');


// Register

exports.userRegister = async(req,res)=>{
    const {username,email,password,mobile} = req.body
    console.log(req.body);

    try{
        const existingUser = await user.findOne({email})
        if(existingUser){
            res.status(401).json('User Already exists')
        }else{
      const newUser = new user({
        username,email,password,mobile
   })
      await newUser.save()
      res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
    
}

// Login

exports.userLogin = async(req,res)=>{
    const {email} = req.body
    try{
      const existingUser = await user.findOne({email})
      if(existingUser){
        const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSOWRD)
   
        res.status(200).json({user:existingUser,token,role:existingUser.role})

      }else{
         res.status(401).json("User Not found...Please Register")
      }
    }catch(err){
        res.status(500).json(err)
    }
}

