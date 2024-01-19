const express = require('express')
const router = express.Router()

var loginCollection = require('../controllers/login.controller')
router.get('/' , loginCollection.getLogin)
router.post('/',loginCollection.postLogin)


module.exports = router