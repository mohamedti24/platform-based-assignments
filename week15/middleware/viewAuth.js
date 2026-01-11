const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers?.authorization

  if (!authHeader) {
    return res.redirect('/auth/login')
  }

  try {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, 'secret')
    next()
  } catch (err) {
    return res.redirect('/auth/login')
  }
}
