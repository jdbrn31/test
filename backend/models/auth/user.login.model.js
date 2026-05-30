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
    const checkCustomerInfo = async (user_id) => {
    const [result] = await db.query(
        `SELECT * FROM cus_info WHERE user_id = ?`,
        [user_id]
    )
    return result.length > 0
}


module.exports ={ user_login, checkCustomerInfo}
