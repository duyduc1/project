const User = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.getResetPass = (async (req, res) => {
    res.render("resetpassword.ejs")
})

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "duyduc.tesop@gmail.com",
        pass: "qutirnowlbvwpued",
    },
});
console.log(transporter);


exports.postResetPassword = async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.newPassword;
    const user = await User.findOne({
        resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
        return res.status(401).json({ error: 'Invalid or expired password reset token' });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

   
    const mailOptions = {
        from: "duyduc.tesop@gmail.com",
        to: user.email,
        subject: 'Password Reset Confirmation',
        html: `
      <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.redirect('/login')
    } catch (err) {
        console.error('Failed to send password reset confirmation email:', err);
        res.status(500).json({ error: 'Failed to send password reset confirmation email' });
    }
}
