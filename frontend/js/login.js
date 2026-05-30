// =====================
// MODAL UI LOGIC
// =====================
const login_modal = document.querySelector('#login_modal')
const show_register = document.querySelector('#show_register')
const modal = document.querySelector('#login_content')
const login_container = document.querySelector('.login_container')
const register_container = document.querySelector('.register_container')
const container = document.querySelector('.container')
const show_login = document.querySelector('#show_login')

if (login_modal) {
    login_modal.addEventListener('click', () => {
        modal.classList.add('open_login')
        login_container.classList.remove('hide_login')
        register_container.classList.remove('open_register')
    })
}

if (show_login) {
    show_login.addEventListener('click', () => {
        modal.classList.add('open_login')
        login_container.classList.remove('hide_login')
        register_container.classList.remove('open_register')
    })
}

if (container) {
    window.addEventListener('click', (e) => {
        if (e.target === container) {
            modal.classList.remove('open_login')
            login_container.classList.remove('hide_login')
            register_container.classList.remove('open_register')
        }
    })
}

if (show_register) {
    show_register.addEventListener('click', (e) => {
        e.preventDefault()
        login_container.classList.add('hide_login')
        register_container.classList.add('open_register')
    })
}

// =====================
// LOGIN FETCH
// =====================
const user_login = document.querySelector('#user_login')

if (user_login) {
    user_login.addEventListener('submit', async (e) => {
        e.preventDefault()
        try {
            const email = document.querySelector('#login_email').value
            const password = document.querySelector('#login_password').value

            if (!email || !password) {
                alert('All fields are required!')
                return
            }

            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })

            if (!response.ok) throw new Error(`Server error ${response.status}`)

            const data = await response.json()

            if (data.success) {
    window.location.href = data.redirect  // trust the backend's redirect
}

        } catch (error) {
            console.error('Login failed:', error)
        }
    })
}

// =====================
// CHECK CUSTOMER INFO
// =====================
async function checkCustomerInfo(userId) {
    try {
        const response = await fetch(`http://localhost:8080/api/customer/info/${userId}`, {
            credentials: 'include'
        })

        if (response.ok) {
            window.location.href = '/pages/main-page.html'
        } else {
            window.location.href = '/pages/customer-information.html'
        }

    } catch (error) {
        console.error('Check customer info failed:', error)
    }
}