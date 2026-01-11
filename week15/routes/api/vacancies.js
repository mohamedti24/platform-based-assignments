const express = require('express')
const router = express.Router()
const VacancyController = require('../../controllers/VacancyController')

router.get('/', VacancyController.getAllVacancies)
router.get('/:id', VacancyController.getVacancyById)

module.exports = router
