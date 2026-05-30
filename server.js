const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const userRoutes = require('./backend/routes/user.routes.js')
const customerRoutes = require('./backend/routes/customer.route.js')
const appointmentRoutes = require('./backend/routes/appointment.route.js')

const app = express()

app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'frontend')))

app.use(userRoutes)
app.use('/api', customerRoutes)
app.use('/api', appointmentRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}`))