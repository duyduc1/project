const express = require('express')
const router = express.Router()

const loginAdmin = require('../controllers/adminlogin.controller')
router.get('/' , loginAdmin.getLoginAdmin)
router.post('/' , loginAdmin.postLoginAdmin)

module.exports = router