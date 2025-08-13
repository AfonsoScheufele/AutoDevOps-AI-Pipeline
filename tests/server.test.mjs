import request from 'supertest';
import app from '../server.js';

describe('Testes do servidor', () => {
  // Testes da rota principal
  it('GET / deve retornar 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  // Testes da rota /status
  it('GET /status deve retornar 200', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  // Testes da rota /deploy
  it('POST /deploy com branch deve retornar 200', async () => {
    const res = await request(app).post('/deploy').send({ branch: 'main' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Deploy iniciado para a branch main');
  });

  it('POST /deploy sem branch deve retornar 400', async () => {
    const res = await request(app).post('/deploy').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Branch não informada');
  });

  // Teste de rota inexistente
  it('GET /nonexistent deve retornar 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });

  // Teste do middleware de erro
  it('Middleware de erro deve retornar 500', async () => {
    app.get('/force-error', (_req, _res) => {
      throw new Error('Erro forçado');
    });

    const res = await request(app).get('/force-error');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal Server Error');
  });
});
