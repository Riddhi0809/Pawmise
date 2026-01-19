const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Pawmise API', () => {

  it('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('GET /api/board should respond', async () => {
    const res = await request(app).get('/api/board');
    expect(res.status).to.be.oneOf([200, 404]);
  });

});
