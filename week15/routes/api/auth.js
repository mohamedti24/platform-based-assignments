const express = require('express')
const router = express.Router()

// ✅ THIS LINE WAS MISSING
const AuthController = require('../../controllers/authController')

// register
router.post('/register', AuthController.register)

// login
router.post('/login', AuthController.login)

module.exports = router
