const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = [] // in-memory (NO database needed)

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  users.push({ name, email, password: hashed })
  const token = jwt.sign({ email }, 'secret')
  res.status(201).json({ token })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Invalid' })
  const token = jwt.sign({ email }, 'secret')
  res.json({ token })
}
