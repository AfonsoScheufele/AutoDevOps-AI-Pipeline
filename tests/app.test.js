const http = require('http');
const app = require('../server'); // vamos ajustar seu app para exportar o servidor

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

test('GET / retorna "Hello World from AutoDevOps!"', (done) => {
  http.get('http://localhost:3000', (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
      expect(data).toBe('Hello World from AutoDevOps with Express!\n');
      done();
    });
  });
});
