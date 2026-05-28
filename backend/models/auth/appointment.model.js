const db = require('../../config/db')

// FIXED: parameter order matches controller
const checkSlot = async (doctor, date, time) => {
    const [existingSlot] = await db.query(
        `SELECT appointment_id 
        FROM appointment
        WHERE appointment_doctor = ?
        AND appointment_date = ?
        AND appointment_time = ?`,
        [doctor, date, time]
    )

    return existingSlot
}

const createAppointment = async (cus_id, appointment) => {

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
    } = appointment

    const sql = `INSERT INTO appointment (
    cus_id,
    appointment_owner_name,
    appointment_phone,
    appointment_email,
    appointment_pet_name,
    appointment_pet_type,
    appointment_doctor,
    appointment_service,
    appointment_date,
    appointment_time,
    appointment_note
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        cus_id,
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
    ]

    // FIXED: destructure result
    const [result] = await db.query(sql, values)

    return result
}

module.exports = { createAppointment, checkSlot }