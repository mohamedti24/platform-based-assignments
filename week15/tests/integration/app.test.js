const request = require('supertest')
const app = require('../../app')

describe('Auth API - Integration Test', () => {
  test('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A', email: 'b@test.com', password: '123' })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
  })
})
