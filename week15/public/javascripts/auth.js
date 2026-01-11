const AUTH_API = 'http://localhost:3000/api/auth'

async function login(email, password) {
  const res = await fetch(`${AUTH_API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (data.token) {
    localStorage.setItem('token', data.token)
    alert('Login successful')
  } else {
    alert(data.message || 'Login failed')
  }
}

async function register(name, email, password) {
  const res = await fetch(`${AUTH_API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await res.json()
  alert(data.message || 'Registered successfully')
}

function logout() {
  localStorage.removeItem('token')
  alert('Logged out')
}
