const db = require('../../config/db')
const bcrypt = require('bcrypt')

const user_login = async ({ email, password }) => {
    const [result] = await db.query(
        `SELECT * FROM user_acc WHERE email = ?`,
        [email]
    )

    if (result.length === 0) {
        return { success: false, message: 'User not found' }
    }

    const dbUser = result[0]
    const isMatch = await bcrypt.compare(password, dbUser.password)

    if (!isMatch) {
        return { success: false, message: 'Invalid credentials' }
    }

    return { success: true, user: dbUser }
}

const checkIdExist = async (user_id) => {
    try {
        const [rows] = await db.query(
            `SELECT 1 FROM cus_info WHERE user_id = ? LIMIT 1`,
            [user_id]
        )
        return rows.length > 0
    } catch (error) {
        console.error('Failed to check email existence', error)
        return false
    }
}

module.exports = {
    user_login,
    checkIdExist
}