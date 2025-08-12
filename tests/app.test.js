const http = require('http');
const app = require('../server');

let server;
const port = 3001;  // porta que o servidor vai usar para teste

beforeAll((done) => {
  server = app.listen(port, done); // espera o servidor iniciar antes de rodar o teste
});

afterAll((done) => {
  server.close(done); // fecha o servidor após todos os testes
});

test('GET / retorna "Hello World from AutoDevOps with Express!"', (done) => {
  http.get(`http://localhost:${port}`, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
      expect(data).toBe('Hello World from AutoDevOps with Express!');
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

