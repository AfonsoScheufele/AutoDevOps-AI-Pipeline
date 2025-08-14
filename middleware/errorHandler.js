import winston from 'winston';

// Configuração do logger com Winston
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/errors.log' }),
  ],
});

// Middleware de tratamento de erros
export default function errorHandler(err, req, res, _next) {
  // Loga o erro
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
  });

  // Retorna resposta padrão de erro
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}
