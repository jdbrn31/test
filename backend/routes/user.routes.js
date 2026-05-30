const express = require('express')
const { login, register, getProtectedData } = require('../controllers/auth/user.controller.index')
const { verifyToken, verifyAdmin } = require('../middlewares/auth.js')
const router = express.Router()


router.post('/api/login', login)
router.post('/api/register', register)
router.get('/api/protected', verifyToken, verifyAdmin, getProtectedData)

module.exports = router