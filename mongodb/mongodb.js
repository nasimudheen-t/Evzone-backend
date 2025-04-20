const mongoose = require('mongoose')

const dbconnection = process.env.MONGODBCONNECTION

mongoose.connect(dbconnection).then((res=>{
    console.log("mongodb connected successfully");
    
})).catch((err=>{
    console.log("mongodb connection failed");
    
}))