const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const registerSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    numberphone:{
        type:Number,
        required:true
    },
    token: {
        type: String 
    },
    resetToken : String,
    resetTokenExpiration :Date,
})

registerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

registerSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const registerCollection = new mongoose.model('users',registerSchema)


module.exports = registerCollection