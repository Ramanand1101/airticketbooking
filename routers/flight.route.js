const express=require("express")
const {flightModel}=require("../models/flight.model")
const flightRouter=express.Router();

//get All flight data
flightRouter.get("/",async(req,res)=>{
    try{
        let allFlightdata=await flightModel.find();
        console.log(allFlightdata.length);
        res.status(200).send(allFlightdata)
    }
    catch(err){
        res.status(400).send({error:error.message})
    }
})
//get all data by id
flightRouter.get("/:id",async(req,res)=>{
    let id=req.params.id;
    console.log(id)
    try{
        let data=await flightModel.findById(id);
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
})

//Adding the data on flight using post
flightRouter.post("/",async(req,res)=>{
    let data=req.body;
    try{
        let flight=new flightModel(data);
        await flight.save()
        res.status(200).send(
            "Data Added on flightdatabase successfully"
        )
    }
        catch(error){
            res.status(400).send({
                error:error.message
            })
        }
    })

//update data on flight database
flightRouter.patch("/:id",async(req,res)=>{
    let id=req.params.id;
    let data=req.body;
    try{
        await flightModel.findByIdAndUpdate(id,data);
        res.status(201).send("Flight Data update successfully")
    }
    catch(error){
        res.status(400).send({
            error:error.message
        })
    }
})
//Delete data on flight database

flightRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id;
    try{
        await flightModel.findByIdAndDelete(id);
        res.status(202).send("Flight Data deleted successfully")
    }
    catch(error){
        res.status(400).send({
            error:error.message
        })
    }
})
module.exports={
    flightRouter
}

