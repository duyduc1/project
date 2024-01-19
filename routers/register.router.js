const express = require('express')
const router = express.Router()

var registerController = require('../controllers/register.controller')
router.get('/',registerController.getRegister)
router.post('/',registerController.postRegister)

module.exports = router