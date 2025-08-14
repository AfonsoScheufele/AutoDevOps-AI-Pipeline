import request from 'supertest';
import app from '../server.js';

describe('Middleware de segurança', () => {
  test('Deve adicionar headers de segurança', async () => {
    const res = await request(app).get('/status'); // qualquer rota que exista

    expect(res.headers['x-dns-prefetch-control']).toBeDefined();
    expect(res.headers['x-frame-options']).toBeDefined();
    expect(res.headers['access-control-allow-origin']).toBe('*'); // CORS
  });
});
