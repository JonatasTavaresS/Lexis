import express from 'express';
import { login } from '../controllers/authController';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de usuários na plataforma Lexis
*/
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login de usuário
 *     description: Autentica um usuário na plataforma Lexis
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do usuário
 *       400:
 *         description: Usuário ou senha inválidos
 *       500:
 *         description: Erro ao realizar login
 */
router.post('/login', asyncHandler(login));

export default router;
