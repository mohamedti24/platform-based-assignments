const express = require('express')
const router = express.Router()

const AdminController = require('../../controllers/adminController')
const auth = require('../../middleware/auth')

// 🔐 API auth middleware (JWT, no redirect)
router.use(auth)

router.get('/users', AdminController.getAllUsers)
router.post('/vacancies', AdminController.createVacancy)
router.delete('/vacancies/:id', AdminController.deleteVacancy)

module.exports = router
