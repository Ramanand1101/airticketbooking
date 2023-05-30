const mongoose=require("mongoose")

const connection =mongoose.connect=mongoose.connect(process.env.mongoURL)

module.exports={
    connection
}