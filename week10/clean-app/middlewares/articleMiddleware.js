const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const canEditArticle = async (req, res, next) => {
  const articleId = parseInt(req.params.id);
  const user = req.session.user;

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return res.status(404).send('Article not found');
  }

  // ✅ Admin can do anything
  if (user.role === 'ADMIN') {
    return next();
  }

  // ✅ Member can edit own article
  if (article.authorId === user.id) {
    return next();
  }

  return res.status(403).send('Forbidden');
};

module.exports = {
  canEditArticle,
};
