const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');

let vacancies = [
  { id: 1, title: 'Backend Developer', company: 'Tech Corp' }
];

router.get('/', authenticate, (req, res) => {
  res.json(vacancies);
});

router.post('/', authenticate, authorize('admin'), (req, res) => {
  vacancies.push({ id: vacancies.length + 1, ...req.body });
  res.json({ message: 'Vacancy added' });
});

module.exports = router;