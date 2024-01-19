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

exports.postResetPass = (async (req, res) => {
    const token = req.query.token
    const decodedToken = jwt.sign(token, process.env.JWT_SECRET);
    const user = await User.findOne({
        _id: decodedToken.id,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    })

    if (!user) {
        return res.status(401).json({ error: 'Invalid or expired password reset token' })
    }

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save()

    const mailOptions = {
        from: "duyduc.tesop@gmail.com",
        to: user.email,
        subject: 'Password Reset Confirmation',
        html: `
      <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
    `,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log(transporter);
        res.json({ message: 'Password reset email sent' });
    } catch(err) {
      console.log(err);
        console.error('Failed to send password reset email:');
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
})

// exports.postResetPassword = async (req, res) => {
//     const resetToken = req.query.token;
//     const password = req.body.password;

//     console.log(resetToken);
//     console.log(password);
//     const user = await User.findOne({
//         resetToken :resetToken,
//         resetTokenExpiration: { $gt: Date.now() },
//     });

//     if (user) {
//         user.password = password;
//         user.resetToken = undefined;
//         user.resetTokenExpiration = undefined;
//         await user.save();

//         const mailOptions = {
//             from: "duyduc.tesop@gmail.com",
//             to: user.email,
//             subject: 'Password Reset Confirmation',
//             html: `
//                   <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
//                 `,
//         }
//         try {
//             await transporter.sendMail(mailOptions);
//             console.log(transporter);
//             res.json({ message: 'Password reset email sent' });
//         } catch (err) {
//             console.log(err);
//             console.error('Failed to send password reset email:');
//             res.status(500).json({ error: 'Failed to send password reset email' });
//         }
//     }
   
// };