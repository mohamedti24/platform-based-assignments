// controllers/VacancyController.js

exports.getAllVacancies = (req, res) => {
  res.json({
    vacancies: [
      {
        id: 1,
        title: 'Backend Developer',
        company: 'Tech Corp',
        location: 'Remote'
      }
    ]
  })
}

exports.getVacancyById = (req, res) => {
  const { id } = req.params
  res.json({
    id,
    title: 'Backend Developer',
    company: 'Tech Corp',
    location: 'Remote'
  })
}
