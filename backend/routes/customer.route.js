const express = require("express")
const { save_customer } = require("../controllers/customer.info.controller")
const {verifyToken }= require("../middlewares/auth.js")

const router = express.Router()

router.post("/save-customer", verifyToken, save_customer)

module.exports = router