const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/:id', authenticate, authorize('member'), (req, res) => {
  res.json({ message: 'Applied successfully', vacancyId: req.params.id });
});

module.exports = router;