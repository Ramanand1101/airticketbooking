//======================================= All import and Export file present here ======================================
const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")

const {userRouter}=require("./routers/user.route")
const {flightRouter}=require("./routers/flight.route")
const {bookingRouter}=require("./routers/booking.route")
const {authenticate}=require("./middleware/authenticate")
const app=express()
//==================================== Router are present here ===================================================
//middleware
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Air Flight booking")
})


app.use("/user",userRouter)
app.use(authenticate)
app.use("/book",bookingRouter)
app.use("/flights",flightRouter)




//=========================== Dont Touch this code =======================================
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(error){
        console.log("Not connected to DB")
        console.log(error.message)
    }
    console.log(`Server running in ${process.env.port}`)
})