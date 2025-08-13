import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // Retorna JSON com a mensagem
  res.json({ message: 'Hello World from AutoDevOps with Express!' });
});

// Rota de teste de erro
router.get('/force-error', (req, res, next) => {
  // Dispara erro propositalmente
  next(new Error('Erro proposital para teste'));
});

export default router;
