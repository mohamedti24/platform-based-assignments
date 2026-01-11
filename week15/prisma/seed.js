const prisma = require('./client')
const bcrypt = require('bcryptjs')

async function main() {
  // Clear existing data (safe for dev)
  await prisma.application.deleteMany()
  await prisma.vacancy.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const memberPassword = await bcrypt.hash('member123', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const member = await prisma.user.create({
    data: {
      name: 'Member',
      email: 'member@test.com',
      password: memberPassword,
      role: 'MEMBER',
    },
  })

  // Create vacancies
  await prisma.vacancy.createMany({
    data: [
      {
        title: 'Backend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'Node.js developer with Express and Prisma',
      },
      {
        title: 'Frontend Developer',
        company: 'Web Studio',
        location: 'Jakarta',
        description: 'React developer',
      },
    ],
  })

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
