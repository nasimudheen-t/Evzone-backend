const jwt = require('jsonwebtoken');


const jwtMiddleware  = (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1] 
    console.log(token);
    try{
        if(token){
            const verifyToken = jwt.verify(token,process.env.JWTPASSOWRD)
            console.log(verifyToken);
            req.userId = verifyToken.userid
            next()
            
        }
    }catch(err){
        res.status(401).json("authorization failed")
    }
}


module.exports = jwtMiddleware