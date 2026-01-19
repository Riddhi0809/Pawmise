const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Pawmise API Endpoints', () => {

  it('GET /api/board should respond', async () => {
    const res = await request(app).get('/api/board');
    expect(res.status).to.be.oneOf([200, 404]);
  });

  it('GET /api/visits should respond', async () => {
    const res = await request(app).get('/api/visits');
    expect(res.status).to.be.oneOf([200, 404]);
  });

});
