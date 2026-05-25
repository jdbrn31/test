const db = require("../config/db")

const cus_save_info = async (data, user_id) => {
    console.log('data received:', data)        // ✅ Add this
    console.log('user_id received:', user_id) 
    try {
        // ✅ Validation BEFORE the query
        if (
            !data.cus_fullname ||
            !data.cus_email    ||
            !data.cus_age      ||
            !data.cus_address  ||
            !data.cus_contact
        ) {
            return {
                success: false,
                message: 'All fields are required!'
            }
        }

        // ✅ Added user_id column & fixed INSERT syntax (no WHERE)
        const sql = `INSERT INTO cus_info (
                        user_id,
                        cus_fullname,
                        cus_email,
                        cus_age,
                        cus_address,
                        cus_contact
                    ) VALUES (?,?,?,?,?,?)`

        // ✅ Pass values as an array, not an object
        const [result] = await db.execute(sql, [
    user_id,
    data.cus_fullname,
    data.cus_email,
    data.cus_age,
    data.cus_address,
    data.cus_contact
])

        return {
            success: true,
            message: 'Customer info saved!',
            data: result
        }

    } catch (error) {
        console.error('Error customer_info', error)
        return {
            success: false,
            message: 'An error occurred while saving customer info.'
        }
    }
}
module.exports = cus_save_info