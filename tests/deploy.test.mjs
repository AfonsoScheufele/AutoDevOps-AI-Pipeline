import http from 'http';
import app from '../server.js';

let server;
const port = 3003;

beforeAll(done => {
  server = app.listen(port, done);
});

afterAll(done => {
  server.close(done);
});

test('POST /deploy simula deploy e retorna sucesso', done => {
  const data = JSON.stringify({ branch: 'main' });

  const options = {
    hostname: 'localhost',
    port,
    path: '/deploy',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, res => {
    expect(res.statusCode).toBe(200);

    let responseData = '';
    res.on('data', chunk => (responseData += chunk));
    res.on('end', () => {
      const json = JSON.parse(responseData);
      expect(json.message).toMatch(/deploy/i);
      done();
    });
  });

  req.write(data);
  req.end();
});
