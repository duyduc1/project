const User = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getForgotPass = (async (req, res) => {
    res.render("forgotpassword.ejs")
})

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "duyduc.tesop@gmail.com",
        pass: "qutirnowlbvwpued",
    },
});

exports.postForgotPass = (async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000
        await user.save()

        const resetUrl = `http://${req.headers.host}/resetpass?token=${token}`;
        const mailOptions = {
            from: "duyduc.tesop@gmail.com",
            to: user.email,
            subject: 'Password Reset Request',
            html: `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
          `,
        };
        try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'Password reset email sent' });
        } catch(err) {
          console.log(err);
            console.error('Failed to send password reset email:');
            res.status(500).json({ error: 'Failed to send password reset email' });
        }
    };
})






