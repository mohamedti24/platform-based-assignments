// controllers/MemberController.js

exports.applyJob = (req, res) => {
  const { vacancyId } = req.params
  res.status(201).json({
    message: `Member applied to vacancy ${vacancyId}`
  })
}

exports.getMyApplications = (req, res) => {
  res.json({
    message: 'Member applications',
    applications: []
  })
}
