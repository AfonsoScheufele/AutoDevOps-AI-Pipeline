import logger from '../middleware/logger.js';
import { jest, describe, test, expect } from '@jest/globals';

describe('Middleware logger', () => {
  test('Deve chamar next() e imprimir log', () => {
    // Mock dos objetos req, res e next
    const req = { method: 'GET', url: '/teste' };
    const res = {};
    const next = jest.fn();

    // Mock do console.log para capturar a saída
    console.log = jest.fn();

    logger(req, res, next);

    // Verifica se o console.log foi chamado
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('GET /teste'));

    // Verifica se next() foi chamado
    expect(next).toHaveBeenCalled();
  });
});
