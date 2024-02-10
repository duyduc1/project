const express = require('express')
const router = express.Router()

const searchUser = require('../controllers/searchuser.controller')
router.get('/' , searchUser.getListUser)
router.get('/search',searchUser.getUserList)

module.exports = router