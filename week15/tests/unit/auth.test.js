const httpMocks = require('node-mocks-http')
const AuthController = require('../../controllers/authController')
const prisma = require('../../prisma/client')
const bcrypt = require('bcryptjs')

describe('AuthController - register', () => {
  it('should register a user', async () => {
    const req = httpMocks.createRequest({
      body: {
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123',
      },
    })

    const res = httpMocks.createResponse()

    await AuthController.register(req, res)

    expect(res.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: 'test@test.com' },
    })

    expect(user).not.toBeNull()
  })
})
