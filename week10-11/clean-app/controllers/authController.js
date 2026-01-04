const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /login
const loginForm = (req, res) => {
  res.render('login');
};

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).send('User not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send('Wrong password');
  }

  // ✅ ASSIGNMENT ADMIN LOGIC
  const role = email === 'admin@test.com' ? 'ADMIN' : user.role;

  // ✅ SAVE USER TO SESSION
  req.session.user = {
    id: user.id,
    email: user.email,
    role,
  };

  res.redirect('/articles');
};

// POST /logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = {
  loginForm,
  login,
  logout,
};
