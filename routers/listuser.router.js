const express = require('express')
const router = express.Router()

var getListUser = require('../controllers/listuser.controller')
router.get('/' ,getListUser.getUser)
router.post('/' , getListUser.postUser)
router.put('/:id' , getListUser.userUpdate)
router.delete('/:id', getListUser.deleteItem)

module.exports = router