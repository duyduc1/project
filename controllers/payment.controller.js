const payment = require('../models/payment')
const qr = require('qrcode-terminal')

exports.getPayment = (async(req,res) =>{
    res.render('payment.ejs')
})

exports.postPayment = (async(req,res) =>{
    const dataPayment = {
        namefilm : req.body.namefilm,
        Subtitles : req.body.Subtitles,
        centerlocation : req.body.centerlocation,
        screeningrate : req.body.screeningrate,
        Date : req.body.Date,
        numberseatsbooked :req.body.numberseatsbooked,
        seatposition : req.body.seatposition,
        totalcost : req.body.totalcost
    }
    const newPayment = new payment(dataPayment)
    const result = await newPayment.save()
   

    const dataString = JSON.stringify(dataPayment);

    qr.generate(dataString, { small: true });
})