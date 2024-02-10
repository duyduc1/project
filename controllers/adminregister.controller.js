const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

exports.getAdminRegister = (async (req, res) => {
    res.render("adminregister.ejs");
});

exports.postAdminRegister = (async (req, res) => {
    const { username, password, email } = req.body;

    const existingAdmin = await Admin.findOne({ email: email });
    
    if (existingAdmin) {
        return res.status(400).send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const dataAdmin = {
        name: username,
        password: hashedPassword,
        email: email
    };
    const newAdmin = new Admin(dataAdmin);    
    try {
        const result = await newAdmin.save();
        res.redirect('/loginadmin');
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
