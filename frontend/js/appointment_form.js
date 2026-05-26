const appointment_form = document.querySelector('#appointment-form')

if (appointment_form) {

    appointment_form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const appointment_owner_name = document.querySelector('#appointment-owner-name').value
        const appointment_phone = document.querySelector('#appointment-phone').value
        const appointment_email = document.querySelector('#appointment-email').value
        const appointment_pet_name = document.querySelector('#appointment-pet-name').value
        const appointment_pet_type = document.querySelector('#appointment-pet-type').value
        const appointment_doctor = document.querySelector('#appointment-doctor').value
        const appointment_service = document.querySelector('#appointment-service').value
        const appointment_date = document.querySelector('#appointment-date').value
        const appointment_time = document.querySelector('#appointment-time').value
        const appointment_note = document.querySelector('#appointment-notes').value

        try {

            if (
                !appointment_owner_name ||
                !appointment_phone ||
                !appointment_email ||
                !appointment_pet_name ||
                !appointment_pet_type ||
                !appointment_doctor ||
                !appointment_service ||
                !appointment_date ||
                !appointment_time ||
                !appointment_note
            ) {
                alert('All fields are required!')
                return
            }

            const response = await fetch('http://localhost:8080/api/appointment-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ownerName: appointment_owner_name,
                    phone: appointment_phone,
                    email: appointment_email,
                    petName: appointment_pet_name,
                    petType: appointment_pet_type,
                    doctor: appointment_doctor,
                    service: appointment_service,
                    date: appointment_date,
                    time: appointment_time,
                    note: appointment_note,
                })
            })

            //IF THE BACKEND RETURN NON-JSON ON ERROR ,THIS CAN CRASH
            let data = {}

            try {
                data = await response.json()
            } catch (err) {
                console.log('No JSON response')
            }

            if (!response.ok) {
                throw new Error(data.message || 'Appointment error')
            }

            alert('Appointment submitted successfully!')
            console.log(data)

            if (!response.ok) {
                throw new Error('appointment error')
            }

        } catch (error) {
            console.error('Appointment catch error', error)
        }

    })

}