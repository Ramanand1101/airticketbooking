const express=require("express")
const {bookingModel}=require("../models/booking.model")

const bookingRouter=express.Router();

//added the data on booking database
bookingRouter.post("/booking",async(req,res)=>{
    let bookdata={
        user:req.body.user_Id,
        flight:req.body.flight
    }
    try{
        let bookingplane=new bookingModel(bookdata)
        await bookingplane.save()
        res.status(201).send({message:"Ticket Booked Successfully"})
    }
    catch(error){
        res.status(500).send({message:error.message})
    }


})

//Get the data of booking

bookingRouter.get("/dashboard",async(req,res)=>{
    try{
        let data=await bookingModel.find()
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
})

module.exports={
    bookingRouter
}