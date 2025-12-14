const articleService = require('../services/articleService');

/**
 * GET /articles
 * PUBLIC – read only
 */
const getAllArticles = async (req, res) => {
  const articles = await articleService.getAllArticles();

  // ✅ لأن عندك views/articles.ejs
  res.render('articles', {
    articles,
    user: req.session?.user || null,
  });
};

/**
 * GET /articles/create
 * LOGIN REQUIRED
 */
const createForm = (req, res) => {
  // لو ما عندك create.ejs خليه form.ejs
  res.render('form');
};

/**
 * POST /articles
 */
const createArticle = async (req, res) => {
  if (!req.session?.user) {
    return res.status(403).send('Login required');
  }

  const { title, content } = req.body;

  await articleService.createArticle({
    title,
    content,
    authorId: req.session.user.id,
  });

  res.redirect('/articles');
};

/**
 * GET /articles/:id/edit
 */
const editForm = async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);

  if (
    req.session.user.role !== 'ADMIN' &&
    article.authorId !== req.session.user.id
  ) {
    return res.status(403).send('Forbidden');
  }

  // لو ما عندك edit.ejs استخدم form.ejs
  res.render('form', { article });
};

/**
 * POST /articles/:id/edit
 */
const updateArticle = async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);

  if (
    req.session.user.role !== 'ADMIN' &&
    article.authorId !== req.session.user.id
  ) {
    return res.status(403).send('Forbidden');
  }

  const { title, content } = req.body;

  await articleService.updateArticle(req.params.id, {
    title,
    content,
  });

  res.redirect('/articles');
};

/**
 * POST /articles/:id/delete
 */
const deleteArticle = async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);

  if (
    req.session.user.role !== 'ADMIN' &&
    article.authorId !== req.session.user.id
  ) {
    return res.status(403).send('Forbidden');
  }

  await articleService.deleteArticle(req.params.id);
  res.redirect('/articles');
};

module.exports = {
  getAllArticles,
  createForm,
  createArticle,
  editForm,
  updateArticle,
  deleteArticle,
};
