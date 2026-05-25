
const path = require('path')
const jwt = require('jsonwebtoken')
const {user_login, user_register} = require('../models/user.model.js')
require('dotenv').config({path: path.join(__dirname, '.env')})

const register = async (req, res)=>{
    try {
        const {email, password} = req.body
//VALIDATE USER
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:'All fields are required'
            })
        }
//CALL MODEL
        const user = await user_register({email, password})
            if(!user.success){
                return res.status(400).json({
                    success: false,
                    message: user.message
            })
}

                return res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    insertId: user.insertId
            })

    } catch (error) {
        console.error('Failed to register this error is from register controller', error)
    }
}

const login = async (req, res)=>{
    try {
// Extract email and password from req.body
        const {email, password} = req.body
// Validate if both fields are filled, stop if not
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
// Call the user_login model function with email and password
        const result = await user_login({email, password})
        console.log('result.user:', result.user) 
// Check if the result is successful, return error if not
        if(!result.success){
            return res.status(400).json({
                success:false,
                message: result.message
            })
        }
// Create token
        const token = jwt.sign({
            id: result.user.user_id,
            user: result.user.email,
            role: result.user.role
        },process.env.JWT_SECRET_KEY, {expiresIn: '1h'}
    )

    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    })
    //console.log("this is coookie log", req.cookies)
    //console.log('This is log for token', token)

return res.status(200).json({
    success: true,
    message: "Successfully logged in!",
    user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role
    }
})


    } catch (error) {
        // Catch and log any errors to the caller
        console.error('Failed to login this error come from user controller login', error)
        console.log("HEADERS:", req.headers);
        console.log("BODY:", req.body); 
        console.error("Login error:", error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        }) 
    }
}

const getProtectedData = (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}

module.exports = {
    login,
    register,
    getProtectedData
}