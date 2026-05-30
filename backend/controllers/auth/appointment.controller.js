// ===============================
// CREATE APPOINTMENT CONTROLLER
// ===============================
const { createAppointment, checkSlot } =
require('../../models/auth/appointment.model.js')

// 1. Receive request from client
const appointment = async (req, res) => {

try {

    // - Get appointment data from request body
    const { 
        ownerName,
        phone,
        email,
        petName,
        petType,
        doctor,
        service,
        date,
        time,
        note
    } = req.body

    // 2. Validate required fields
    if (!ownerName || !phone || !email || !petName || !petType || !doctor || !service || !date || !time || !note) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        })
    }

    // ____________________________________________
    // 3. Validate data format
    // ____________________________________________

    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    if (!/^[0-9]+$/.test(phone)) {
        alert('Invalid phone number it it should start in 9xxxxxxxxx')
        return res.status(400).json({
            success: false,
            message: "Phone must contain numbers only"
        })
    }

    // 4. Business logic validation
    const cus_id = req.user.cus_id

    const existingSlot = await checkSlot(doctor, date, time)

    // ❌ slot already taken
    if (existingSlot.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Unavailable time slot'
        })
    }

    // ✅ create appointment
    const result = await createAppointment(cus_id, {
        ownerName,
        phone,
        email,
        petName,
        petType,
        doctor,
        service,
        date,
        time,
        note
    })

    // check DB result
    if (!result || result.affectedRows === 0) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create appointment'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Successfully booked an appointment',
        appointmentId: result.insertId
    })

} catch (error) {

    console.error('Appointment Controller Error:', error)

    return res.status(500).json({
        success: false,
        message: 'Server error'
    })
}

}

module.exports = appointment