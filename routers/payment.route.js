const express =require('express')
const router = express.Router()

const filmControllers = require('../controllers/payment.controller')
router.get('/' , filmControllers.getPayment)
router.post('/', filmControllers.postPayment)
module.exports = router