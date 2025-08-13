import http from 'http';
import app from '../server.js';

let server;
const port = 3001;  // porta que o servidor vai usar para teste

beforeAll((done) => {
  server = app.listen(port, done);
});

afterAll((done) => {
  server.close(done);
});

test('GET / retorna "Hello World from AutoDevOps with Express!"', (done) => {
  http.get(`http://localhost:${port}`, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
      const json = JSON.parse(data); // <-- aqui
      expect(json.message).toBe('Hello World from AutoDevOps with Express!');
      done();
    });
  });
});

test('GET /status retorna status ok', (done) => {
  http.get(`http://localhost:${port}/status`, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const json = JSON.parse(data);
      expect(json.status).toBe('ok');
      expect(typeof json.uptime).toBe('number');
      done();
    });
  });
});
