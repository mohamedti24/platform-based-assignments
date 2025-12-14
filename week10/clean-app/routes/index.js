var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

// HOME → list users
router.get('/', userController.getAllUsers);

// FORM → register page
router.get('/register', userController.formUser);

// SUBMIT → create user
router.post('/submit', userController.submitUser);

module.exports = router;
