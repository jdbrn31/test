const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const loginRoute = require('./backend/routes/auth.route.js')
const customerRoutes = require("./backend/routes/customer.route.js")

const app = express()

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'frontend')))
app.use(loginRoute)

app.use("/api/customer", customerRoutes)

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})