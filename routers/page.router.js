const express = require('express')
const router = express.Router()

const pageController = require('../controllers/page.controller')
const middleWare = require('../middleware/authUser')
router.get('/' ,middleWare.checkUser,pageController.getPage )

module.exports = router