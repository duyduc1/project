const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getLogin = (async (req, res) => {
    res.render('login.ejs')
})

exports.postLogin = async (req, res) => {
    try {
        const name = req.body.username;
        const password = req.body.password;


        const user = await User.findOne({ name });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const role = user.isAdmin ? 'admin' : 'user';
            const token = jwt.sign({ userId: user._id, role }, 'your-secret-key', { expiresIn: '1h' });
            user.token = token
            await user.save()

            res.cookie('userToken', token);
            res.redirect('/page');
        } else {
            res.status(403)
        }
    } catch (error) {
        console.error(error);
        res.status(500)
    }
};
