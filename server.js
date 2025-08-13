import express from 'express';
import dotenv from 'dotenv';

import logger from './middleware/logger.js';
import indexRouter from './routes/index.js';
import statusRouter from './routes/status.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware de log
app.use(logger);

// Rotas
app.use('/', indexRouter);
app.use('/status', statusRouter);

// Rota /deploy
app.post('/deploy', (req, res) => {
  const { branch } = req.body;
  if(branch) {
    return res.json({ message: `Deploy iniciado para a branch ${branch}` });
  }
  res.status(400).json({ error: 'Branch não informada' });
});

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Só inicia o servidor se for o arquivo principal
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export default app;
