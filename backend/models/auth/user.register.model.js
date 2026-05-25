const db = require('../../config/db')
const bcrypt = require('bcrypt')

const user_register = async ({ email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const [rows] = await db.query(
            `INSERT INTO user_acc (email, password) VALUES (?, ?)`,
            [email, hashedPassword]
        )
        return { success: true, insertId: rows.insertId }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Email already exists' }
        }
        throw error
    }
}

module.exports = user_register
