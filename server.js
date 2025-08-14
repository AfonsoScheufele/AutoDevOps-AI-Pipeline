import express from 'express';
import dotenv from 'dotenv';
import winston from 'winston';

import indexRouter from './routes/index.js';
import statusRouter from './routes/status.js';
import errorHandler from './middleware/errorHandler.js';
import security from './middleware/security.js'; // <- seu módulo de security

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Logger geral com Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Middleware de log
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware de segurança
security(app);

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/', indexRouter);
app.use('/status', statusRouter);

// Rota /deploy
app.post('/deploy', (req, res) => {
  const { branch } = req.body;
  if (branch) {
    logger.info(`Deploy iniciado para a branch ${branch}`);
    return res.json({ message: `Deploy iniciado para a branch ${branch}` });
  }
  res.status(400).json({ error: 'Branch não informada' });
});

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Só inicia o servidor se não estivermos em teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
}

export default app;
