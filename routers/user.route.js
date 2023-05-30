const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../models/user.model")
const userRouter=express.Router()

//Register Route
userRouter.post("/register",async(req,res)=>{
    let {name,email,password}=req.body;
    try{
        let user=await UserModel.find({
            email
        })
        if(user.length>0){
            res.send("User Already Exists")
        }
        else{
            bcrypt.hash(password, 5,async(err,hash)=>{
                if(hash){
                    console.log(hash)
                    let newUser=new UserModel({name,email,password:hash})
                    await newUser.save()
                    res.status(201).json({
                        message:"User has been registered"
                    })
                }
                else{
                    res.status(400).json({
                        message:error.message
                    })
                }
               
        
        })
    }
   
    }
    catch(error){
        console.log(error.message)
    }
})
userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try{
        let user=await UserModel.find({
            email
        })
        if(user.length===0){
            res.status(404).send("user not found");
        }
        else{
            let hashPassword=user[0]?.password;
            bcrypt.compare(password,hashPassword,async(err,result)=>{
                if(result){
                    let token=jwt.sign({
                        user_Id:user[0]._id,},"masai",{expiresIn:"10d"});
                        res.status(201).json({message:"User loggedIn successsfully",token})
                    }
                    })
                }
            }
            catch(error){
                res.status(500).json({message:error.message})
            }
            })
            module.exports={userRouter}