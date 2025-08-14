import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import winston from 'winston';

import indexRouter from './routes/index.js';
import statusRouter from './routes/status.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Winston para logs estruturados
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ],
});

// Middleware de log usando Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware de segurança
app.use(helmet());
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
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
app.use((err, req, res, _next) => {
    // eslint-disable-next-line no-unused-vars
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Só inicia o servidor se for o arquivo principal
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
}

export default app;
