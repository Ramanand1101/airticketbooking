const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"masai");
    if(decoded){
        console.log(decoded)
        req.body.user_Id=decoded.user_Id;
        next()
    }
    else{
        res.send("Login Again")
    }
}
module.exports={
    authenticate
}