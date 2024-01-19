const express = require('express')
const router = express.Router()

var registerAdmin = require('../controllers/adminregister.controller')
router.get('/' , registerAdmin.getAdminRegister)
router.post('/' ,registerAdmin.postAdminRegister)

module.exports = router