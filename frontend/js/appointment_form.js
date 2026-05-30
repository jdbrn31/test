const appointment_form = document.querySelector('#appointment-form')

if (appointment_form) {
    //DOCTOR AVAILABILITY
    const appointment_date = document.querySelector('#date')
    const selectDropdownDoctor = document.querySelector('#doctor')
    const selectDropdownTime = document.querySelector('#time')

    selectDropdownDoctor.innerHTML = '<option value="" disabled selected>Select a date first...</option>'

    const doctors = [
        {
            name: 'Dr. Maria Santos, DVM',
            availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        {
            name: 'Dr. James Reyes, DVM',
            availableDays: ['Tuesday', 'Thursday', 'Saturday']
        },
        {
            name: 'Dr. Claire Lim, DVM',
            availableDays: ['Monday', 'Wednesday', 'Friday']
        },
        {
            name: 'Dr. Patrick Cruz, DVM',
            availableDays: ['Wednesday', 'Sunday']
        }
    ]

    const time_slots = {
        availableTime: [
            '8:00 am',
            '9:00 am',
            '10:00 am',
            '11:00 am',
            '1:00 pm',
            '2:00 pm',
            '3:00 pm',
            '4:00 pm',
        ]
    }

    time_slots.availableTime.forEach(time => {
        const optionTimeSlots = document.createElement('option')
        optionTimeSlots.value = time
        optionTimeSlots.textContent = time
        selectDropdownTime.appendChild(optionTimeSlots)
    })

    appointment_date.addEventListener('change', () => {
        // Clear previous options every time date changes
        selectDropdownDoctor.innerHTML = '<option value="" disabled selected>Select a doctor...</option>'

        const today = new Date(appointment_date.value)
        const dayName = today.toLocaleDateString('en-US', {
            weekday: 'long',
            timeZone: 'UTC'
        })

        const availableDoctors = doctors.filter(doctor => doctor.availableDays.includes(dayName))

        if (availableDoctors.length === 0) {
            selectDropdownDoctor.innerHTML = '<option value="" disabled selected>No doctors available on this day</option>'
            return
        }

        availableDoctors.forEach(doctor => {
            const option = document.createElement('option')
            option.textContent = doctor.name
            option.value = doctor.name
            selectDropdownDoctor.appendChild(option)
        })
    })

    //BOOKING APPOINTMENT SUBMIT FORM
    appointment_form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const owner_name = document.querySelector('#owner-name').value
        const phone = document.querySelector('#phone').value

        if (!/^\d+$/.test(phone)) {
            alert("❌ Invalid phone number. Numbers only allowed.");
            return;
    }
        const email = document.querySelector('#email').value
        const pet_name = document.querySelector('#pet-name').value
        const pet_type = document.querySelector('#pet-type').value
        const doctor = document.querySelector('#doctor').value
        const service = document.querySelector('#service').value
        const date_value = document.querySelector('#date').value
        const time = document.querySelector('#time').value
        const note = document.querySelector('#notes').value

        if (
            !owner_name ||
            !phone ||
            !email ||
            !pet_name ||
            !pet_type ||
            !doctor ||
            !service ||
            !date_value ||
            !time 
        ) {
            alert('All fields are required!')
            return
        }

        try {
            const response = await fetch('http://localhost:8080/api/appointment-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ownerName: owner_name,
                    phone: phone,
                    email: email,
                    petName: pet_name,
                    petType: pet_type,
                    doctor: doctor,
                    service: service,
                    date: date_value,
                    time: time,
                    note: note,
                })
            })

            let data = {}
            try {
                data = await response.json()
            } catch (err) {
                console.log('No JSON response')
            }

            if (!response.ok) {
                if (data.message === 'Unavailable time slot') {
                    alert('⚠️ This time slot is already booked! Please choose a different time.')
                    return
                }
                throw new Error(data.message || 'Appointment error')
            }

            alert('Appointment submitted successfully!')
            console.log(data)

        } catch (error) {
            console.error('Appointment catch error', error)
        }
    })
}