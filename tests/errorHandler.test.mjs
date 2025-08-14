import request from 'supertest';
import app from '../server.js';

describe('Middleware de error handler', () => {
  test('Deve retornar 500 quando um erro é lançado', async () => {
    app.get('/force-error', (_req, _res) => {
      throw new Error('Erro forçado');
    });

    const res = await request(app).get('/force-error');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
