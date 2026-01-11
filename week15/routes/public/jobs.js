const express = require('express')
const router = express.Router()

// 🔹 Jobs data (TEMP – later can be DB)
const jobs = [
  {
    id: '1',
    slug: 'software-engineer',
    title: 'Software Engineer',
    location: 'Remote',
    type: 'Full Time',
    description: 'Build scalable applications.',
    responsibilities: [
      'Write clean code',
      'Fix bugs',
      'Collaborate with team'
    ],
    requirements: [
      'Node.js',
      'JavaScript',
      'Problem-solving skills'
    ]
  },
  {
    id: '2',
    slug: 'backend-developer',
    title: 'Backend Developer',
    location: 'On-site',
    type: 'Contract',
    description: 'Develop backend services.',
    responsibilities: [
      'Create REST APIs',
      'Manage databases'
    ],
    requirements: [
      'Express.js',
      'MongoDB or SQL'
    ]
  }
]

// 🔹 Job list page
router.get('/', (req, res) => {
  res.render('jobs/list', { jobs })
})

// 🔹 Job detail page (USING SLUG)
router.get('/:slug', (req, res) => {
  const job = jobs.find(j => j.slug === req.params.slug)

  if (!job) {
    return res.status(404).send('Job not found')
  }

  res.render('jobs/detail', {
    id: job.id,
    job
  })
})

module.exports = router
