const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (data) => {
  return await prisma.user.create({
    data
  });
};

module.exports = {
  getAllUsers,
  createUser
};
