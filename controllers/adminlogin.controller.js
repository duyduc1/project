const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getLoginAdmin = (async (req, res) => {
    res.render("adminlogin.ejs");
});

exports.postLoginAdmin = (async (req, res) => {
    const { username, password } = req.body;

    try {
        const dataAdmin = await Admin.findOne({ name: username });

        if (dataAdmin) {
            const isPasswordValid = await bcrypt.compare(password, dataAdmin.password);

            if (isPasswordValid) {
                const token = jwt.sign({ username: dataAdmin.name, email: dataAdmin.email }, 'your-secret-key', { expiresIn: '1h' });
                dataAdmin.token = token
                await dataAdmin.save()
                res.cookie('adminToken', token);
                res.redirect('/getuser');              
            } else {
                res.status(403).send('Invalid username or password');
            }
        } else {
            res.status(403).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
