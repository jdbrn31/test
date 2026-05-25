const user_register = require('../../models/auth/user.register.model')

const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const result = await user_register({ email, password })

        if (!result.success) {
            return res.status(409).json({ success: false, message: result.message })
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            insertId: result.insertId
        })
    } catch (error) {
        console.error('[register]', error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

module.exports = register