const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js

describe('GET /orders', () => {
  it('should return a list of orders', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
