// controllers/adminController.js

const users = []
const vacancies = []

exports.getAllUsers = (req, res) => {
  res.json(users)
}

exports.createVacancy = (req, res) => {
  const vacancy = { id: Date.now(), ...req.body }
  vacancies.push(vacancy)
  res.status(201).json(vacancy)
}

exports.deleteVacancy = (req, res) => {
  const id = Number(req.params.id)
  const index = vacancies.findIndex(v => v.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Vacancy not found' })
  }

  vacancies.splice(index, 1)
  res.json({ message: 'Vacancy deleted' })
}
