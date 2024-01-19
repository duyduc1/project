const mongoose = require('mongoose')

const registerAdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requried:true
    }
})

const registerAdminCollection = new mongoose.model('admins' , registerAdminSchema)

module.exports = registerAdminCollection