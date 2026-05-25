const express = require('express')
const router = express.Router()

const { login, register, getProtectedData } = require('../controllers/user.controller.js')
const { verifyToken, verifyAdmin } = require('../middlewares/auth.js')
const save_customer = require('../controllers/customer.info.controller.js')

router.post('/api/login', login)
router.post('/api/register', register)

router.get('/api/protected', verifyToken, verifyAdmin, getProtectedData) 

module.exports = router;