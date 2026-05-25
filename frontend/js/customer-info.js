const customer_info = document.querySelector('#cus_info_form')

if (customer_info) {
    customer_info.addEventListener('submit', async (e) => {
        e.preventDefault()
        try {
            const cus_fullname = document.querySelector('#cus_fullname').value
            const cus_email = document.querySelector('#cus_email').value
            const cus_age = document.querySelector('#cus_age').value
            const cus_address = document.querySelector('#cus_address').value
            const cus_contact = document.querySelector('#cus_contact').value

            if (!cus_fullname || !cus_email || !cus_age || !cus_address || !cus_contact) {
                alert('All fields are required!')
                return
            }

            const response = await fetch('http://localhost:8080/api/customer/save-customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ cus_fullname, cus_email, cus_age, cus_address, cus_contact })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message || 'Something went wrong!')
                return
            }

            alert('Customer information saved successfully!')
            customer_info.reset()
            window.location.href = '/pages/main-page.html'  // ✅ redirect after save

        } catch (error) {
            console.error('Save customer info failed:', error)
        }
    })
}