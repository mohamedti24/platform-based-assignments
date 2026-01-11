const request = require('supertest')
const app = require('../../app')
const prisma = require('../../prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Admin API', () => {
  let token

  beforeEach(async () => {
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
      },
    })

    token = jwt.sign(
      { userId: admin.id, role: admin.role },
      process.env.JWT_SECRET
    )
  })

  it('GET /api/admin/users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
  })
})