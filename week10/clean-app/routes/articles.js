const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');
const { isAuthenticated, isAdmin, isOwnerOrAdmin } = require('../middlewares/auth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// PUBLIC – read only
router.get('/', articleController.getAllArticles);

// CREATE – login required
router.get('/create', isAuthenticated, articleController.createForm);
router.post('/', isAuthenticated, articleController.createArticle);

// UPDATE – owner or admin
router.get(
  '/edit/:id',
  isAuthenticated,
  isOwnerOrAdmin(prisma.article),
  articleController.editForm
);

router.post(
  '/edit/:id',
  isAuthenticated,
  isOwnerOrAdmin(prisma.article),
  articleController.updateArticle
);

// DELETE – admin only
router.post(
  '/delete/:id',
  isAuthenticated,
  isAdmin,
  articleController.deleteArticle
);
module.exports = router;
