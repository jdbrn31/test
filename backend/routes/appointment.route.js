const express = require("express")
const appointment = require("../controllers/auth/appointment.controller.js")
const {verifyToken }= require("../middlewares/auth.js")

const router = express.Router()

router.post('/appointment-submit', verifyToken, appointment)

module.exports = router