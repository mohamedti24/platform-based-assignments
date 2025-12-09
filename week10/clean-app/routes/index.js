var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/register', userController.formUser);
router.post('/submit', userController.submitUser);

module.exports = router;
