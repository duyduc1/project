const User = require('../models/user')

exports.getRegister = (async (req, res) => {
    res.render("register.ejs")
})

exports.postRegister = (async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        numberphone: req.body.numberphone
    }
    const existingUser = await User.findOne({  email: req.body.email })
    if (existingUser) {
        return res.status(400).send("Email Đã Được đăng ký , vui lòng đăng ký bằng Gmail khác")
    }
    const newUser = new User(data);
    try {
        const result = await newUser.save()
        res.redirect('/login')
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})
