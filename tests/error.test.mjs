import http from 'http';
import app from '../server.js';

let server;
const port = 3002;

beforeAll(done => {
  server = app.listen(port, done);
});

afterAll(done => {
  server.close(done);
});

test('GET /rota-inexistente retorna 404', done => {
  http.get(`http://localhost:${port}/rota-inexistente`, res => {
    expect(res.statusCode).toBe(404);
    done();
  });
});
