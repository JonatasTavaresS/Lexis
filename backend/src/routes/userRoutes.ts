import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários na plataforma Lexis
 */
const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema de gerenciamento de bibliotecas.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Primeiro nome do usuário
 *               lastName:
 *                 type: string
 *                 description: Sobrenome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *               role:
 *                 type: string
 *                 description: Papel do usuário no sistema
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 */
router.post("/", authenticate, UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     description: Recupera uma lista de todos os usuários cadastrados no sistema.
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários recuperada com sucesso
 */
router.get("/", authenticate, UserController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     description: Busca um usuário pelo seu identificador único.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", authenticate, UserController.getUser);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Retorna um usuário pelo e-mail
 *     description: Busca um usuário pelo seu endereço de e-mail.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: E-mail do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/email/:email", authenticate, UserController.getUserByEmail);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Modifica os detalhes de um usuário existente.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", authenticate, UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Exclui um usuário do sistema.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", authenticate, UserController.deleteUser);

export default router;
