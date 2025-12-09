const userService = require('../services/userService');

// GET /
const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.render('index', { users });
};

// GET /form
const formUser = (req, res) => {
  res.render('form');
};

// POST /submit
const submitUser = async (req, res) => {
  await userService.createUser(req.body);
  res.redirect('/');
};

module.exports = {
  getAllUsers,
  formUser,
  submitUser
};
