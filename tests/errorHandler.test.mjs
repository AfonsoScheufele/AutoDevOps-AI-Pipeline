import request from 'supertest';
import app from '../server.js';

describe('Error handler', () => {
  test('Rota /force-error retorna 500', async () => {
    const res = await request(app).get('/force-error');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
