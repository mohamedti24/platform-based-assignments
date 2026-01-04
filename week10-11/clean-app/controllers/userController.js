const bcrypt = require('bcrypt');
const userService = require('../services/userService');

// GET /
const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.render('index', { users });
};

// GET /register
const formUser = (req, res) => {
  res.render('form');
};

// POST /submit
const submitUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!password) {
      return res.status(400).send('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createUser({
      email,
      name,
      password: hashedPassword,
    });

    res.redirect('/'); // ✅ correct redirect
  } catch (err) {
    // ✅ handle duplicate email
    if (err.code === 'P2002') {
      return res.status(400).send('Email already exists');
    }

    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllUsers,
  formUser,
  submitUser,
};
  