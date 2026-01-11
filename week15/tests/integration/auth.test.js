const request = require('supertest')
const app = require('../../app')

describe('Auth API', () => {
  it('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Auth User',
        email: 'auth@test.com',
        password: 'password123',
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
  })
})
