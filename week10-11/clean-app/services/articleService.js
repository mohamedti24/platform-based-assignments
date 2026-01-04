const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// READ (public)
const getAllArticles = async () => {
  return await prisma.article.findMany({
    include: {
      author: true,
    },
  });
};

const getArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id: Number(id) },
  });
};

// CREATE
const createArticle = async (data) => {
  return await prisma.article.create({
    data,
  });
};

// UPDATE
const updateArticle = async (id, data) => {
  return await prisma.article.update({
    where: { id: Number(id) },
    data,
  });
};

// DELETE
const deleteArticle = async (id) => {
  return await prisma.article.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
