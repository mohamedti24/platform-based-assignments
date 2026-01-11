const authController = require('../../controllers/authController')
const httpMocks = require('node-mocks-http')

describe('Auth Controller - Unit Test', () => {
  test('register returns token', async () => {
    const req = httpMocks.createRequest({
      body: { name: 'A', email: 'a@test.com', password: '123' }
    })
    const res = httpMocks.createResponse()

    await authController.register(req, res)

    expect(res.statusCode).toBe(201)
    expect(res._getJSONData()).toHaveProperty('token')
  })
})
