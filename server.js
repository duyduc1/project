const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

mongoose.connect("mongodb://localhost:27017/api-ticket")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('error');
    });


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(cookieParser());
app.set('view engine', 'ejs');

var registerRouter = require('./routers/register.router')
var loginRouter = require('./routers/login.router')
var getUserRouter = require('./routers/listuser.router')
var registerAdminRouter = require('./routers/adminregister.router')
var LoginAdminRouter = require('./routers/adminlogin.router')
var pageRouter = require('./routers/page.router')
var forgorPass = require('./routers/forgotPassWord.router')
var resetPass = require('./routers/resetpassword.route')
var apiFilmRouter = require('./routers/adminfilm.router')
var paymentRouter = require('./routers/payment.route')
var checkUser = require('./routers/searchuser.route')

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/getuser', getUserRouter)
app.use('/registeradmin', registerAdminRouter)
app.use('/loginadmin', LoginAdminRouter)
app.use("/page", pageRouter)
app.use('/forgotpass', forgorPass)
app.use('/resetpass', resetPass)
app.use('/upload-profile-pic', apiFilmRouter)
app.use('/uploads', express.static('uploads'));
app.use('/payment' , paymentRouter)
app.use('/users' , checkUser)

app.listen(3005);


