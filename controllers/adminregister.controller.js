const Admin = require('../models/admin')

exports.getAdminRegister = (async(req,res)=>{
    res.render("adminregister.ejs")
})

exports.postAdminRegister = (async(req,res) => {
    const dataAdmin = {
        name : req.body.username,
        password : req.body.password,
        email : req.body.email
    }
    const newAdmin = new Admin(dataAdmin)
    const result = await newAdmin.save()
    res.redirect('/loginadmin')
}) 