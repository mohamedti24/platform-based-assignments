const express = require('express')
const router = express.Router()
const MemberController = require('../../controllers/MemberController')
const auth = require('../../middleware/auth')

router.post('/apply/:vacancyId', auth, MemberController.applyJob)
router.get('/applications', auth, MemberController.myApplications)

module.exports = router