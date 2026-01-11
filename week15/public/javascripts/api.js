const API_URL = 'http://localhost:3000/api'

async function fetchVacancies() {
  const res = await fetch(`${API_URL}/vacancies`)
  return res.json()
}

async function fetchProtected(url) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}
