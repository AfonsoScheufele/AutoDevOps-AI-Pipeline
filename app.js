const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const requestHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World from AutoDevOps!\n');
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = server;
