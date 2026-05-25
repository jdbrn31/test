const cus_save_info = require("../models/customer.info.model.js")

const save_customer = async (req, res) => {
    const { cus_fullname, cus_email, cus_age, cus_address, cus_contact } = req.body
    const user_id = req.user.id

    if (!cus_fullname || !cus_email || !cus_age || !cus_address || !cus_contact) { 
        return res.status(400).json({ success: false, message: 'All fields are required!' })
    }

    try {
    const result = await cus_save_info(
    {
        cus_fullname,
        cus_email,
        cus_age,
        cus_address,
        cus_contact
    },
    user_id
)

        if (!result.success) {
            return res.status(400).json({ message: result.message })
        } else {
            return res.status(200).json({ message: result.message })
        }

    } catch (error) {
        console.error('Error occured while saving cus_info', error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { save_customer }