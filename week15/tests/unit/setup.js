const prisma = require('../../prisma/client')

beforeAll(async () => {
  // ensure DB connection works
  await prisma.$connect()
})

afterEach(async () => {
  // clean tables after every test
  await prisma.application.deleteMany()
  await prisma.vacancy.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})
