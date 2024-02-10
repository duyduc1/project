const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    namefilm :{
        type:String,
        required : true
    },
    Subtitles :{
        type:String,
        required:true
    },
    centerlocation:{
        type:String,
        required:true
    },
    screeningrate :{
        type:String,
        required:true
    },
    Date:Date,
    numberseatsbooked:{
        type:String,
        required:true
    },
    seatposition:{
        type:String,
        required:true
    },
    totalcost:{
        type:String,
        required:true
    }
})

const filmPaymentCollection = new mongoose.model('payments' ,paymentSchema )

module.exports = filmPaymentCollection