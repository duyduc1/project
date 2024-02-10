const express = require('express')
const router = express.Router()

const PassWordReset = require('../controllers/resetpassword')
router.get('/' , PassWordReset.getResetPass)
router.post('/' , PassWordReset.postResetPassword)
module.exports = router