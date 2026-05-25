const mysql = require('mysql2')
const path = require('path')
require('dotenv').config({ path: '../../../.env' })

    const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
})

db.getConnection((error,connection)=>{
    if (error){
        console.error('DATABASE FAILED CONNECTION', error.message)
        
    }
    else{
        console.log('Succesfully connected to the database')
        connection.release()
    }
})


module.exports = db.promise()

