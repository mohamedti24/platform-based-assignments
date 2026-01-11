const request = require('supertest')
const app = require('../../app')

describe('Vacancies API', () => {
  it('GET /api/vacancies (public)', async () => {
    const res = await request(app).get('/api/vacancies')
    expect(res.statusCode).toBe(200)
  })
})