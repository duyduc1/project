const User = require('../models/user')

exports.getRegister = (async (req,res) => {
    res.render("register.ejs")
})

exports.postRegister = (async (req,res) =>{
    const data = {
        name : req.body.username,
        password:req.body.password,
        email : req.body.email,
        numberphone : req.body.numberphone
    }
    const newUser = new User(data);
    const result = await newUser.save()
    res.redirect('/login')
})
