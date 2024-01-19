const Admin = require('../models/admin')

exports.getLoginAdmin = (async (req, res) => {
    res.render("adminlogin.ejs")
})

exports.postLoginAdmin = (async(req,res)=>{
    let name = req.body.username
    let password = req.body.password

    Admin.findOne({name : name})
        .then(dataAdmin => {
            if(dataAdmin){
                if(password === dataAdmin.password){
                    res.redirect('/getuser')
                } else {
                    res.status(403).send('user not found')
                }
            }else{
                res.status(403)
            }
        })
        .catch(error =>{
            res.status(500)
        })
})
