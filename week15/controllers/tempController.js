// controllers/AdminController.js

exports.getAllUsers = (req, res) => {
  res.json({
    message: 'Admin: list of users',
    users: []
  })
}

exports.deleteUser = (req, res) => {
  const { id } = req.params
  res.json({
    message: `Admin: user ${id} deleted`
  })
}

exports.createVacancy = (req, res) => {
  const { title, company, location } = req.body
  res.status(201).json({
    message: 'Admin: vacancy created',
    vacancy: { title, company, location }
  })
}
