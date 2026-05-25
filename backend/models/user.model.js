const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const user_register = async (user) =>{
    try {
        if(!user.email || !user.password){
            console.log('All fields are required!')
            return
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const sql = `INSERT INTO user_acc (email,password) VALUES (?,?)`
        const [rows] = await db.query(sql, [user.email, hashedPassword])

        return { success: true, insertId: rows.insertId };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Email already exists' };
        }
        throw error;
    
    }
}

const user_login  = async(user)=>{
    
    try {
// Validate if email and password are provided, stop if not
    if(!user.email || !user.password){
    return {success: false, message: 'All fields are required!'}
}
// Query the DB to find a user matching the email
    const sql = `SELECT * from user_acc where email = ?`
    const [result] = await db.query(sql, [user.email])
// Check if the user exists, return error if not found

    if(result.length === 0){
        return { success: false, message: 'User not found' }
    }
    const dbUser = result[0]
// Compare the provided password against the stored hashed password using bcrypt.compare()
    const isMatch = await bcrypt.compare(user.password, dbUser.password)
// Check if passwords match, return error if not
    if(!isMatch){
        return { success: false, message: 'Invalid credentials' }
    }
// Return success along with the user data
        return {
            success: true,
            message: 'Succesfully logged in',
            user: dbUser
    }
    console.log('result.user:', result.user)
    } catch (error) {
        // Catch and throw any errors to the caller
        console.error('Failed to login in user model', error)
        return { success: false, message: 'Server error' }
    }
}

module.exports = {
    user_login,
    user_register
}