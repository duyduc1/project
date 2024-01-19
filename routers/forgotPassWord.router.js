const express = require('express')
const router = express.Router()

const PassWordforGot = require('../controllers/forgotPassword')
router.get('/',PassWordforGot.getForgotPass)
router.post('/', PassWordforGot.postForgotPass)

module.exports = router