const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
  res.sendFile('profile.html', { root: 'public' })
})

module.exports = router
