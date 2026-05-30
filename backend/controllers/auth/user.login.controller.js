const jwt = require('jsonwebtoken')
const { user_login, checkCustomerInfo } = require('../../models/auth/user.login.model')
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const result = await user_login({ email, password })

        if (!result.success) {
            return res.status(401).json({ success: false, message: result.message })
        }

        const { user } = result
        const token = jwt.sign(
            { id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        const emailExist = await checkCustomerInfo(user.user_id)

        if (!emailExist) {
            return res.status(200).json({
                success: true,
                redirect: '/pages/customer-information.html'
            })
        }

        // CUSTOMER INFO EXISTS
        return res.status(200).json({
            success: true,
            redirect: '/pages/main-page.html'
        })

    } catch (error) {
        console.error('[login]', error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

module.exports = login