const user_register = document.querySelector('#user_register')

if (user_register) {
    user_register.addEventListener('submit', async (e) => {
        e.preventDefault()
        try {
            const email = document.querySelector('#register_email').value
            const password = document.querySelector('#register_password').value

            if (!email || !password) {
                alert('All fields are required!')
                return
            }

            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) throw new Error(`Server error ${response.status}`)

            const data = await response.json()
            console.log('Registered:', data)
            alert('Registered successfully!')

        } catch (error) {
            console.error('Register failed:', error)
        }
    })
}