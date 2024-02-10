const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
    filename :String,
    path : String,
    namefilm:String,
    time:String,
    showdate:Date,
    nation:String,
    producer:String,
    category:String,
    director:String,
    performer:String
})

const filmApiCollection = new mongoose.model('film' , filmSchema)

module.exports = filmApiCollection