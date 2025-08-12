import express from 'express';
import dotenv from 'dotenv';

import logger from './middleware/logger.js';
import indexRouter from './routes/index.js';
import statusRouter from './routes/status.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware de log
app.use(logger);

// Rotas
app.use('/', indexRouter);
app.use('/status', statusRouter);

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de tratamento de erros
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
