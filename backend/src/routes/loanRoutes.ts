import { Router } from "express";
import { LoanController } from "../controllers/loanController";
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Endpoints para gerenciamento de empréstimos de livros na plataforma Lexis
 */
const router = Router();

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Cria um novo empréstimo
 *     description: Registra um novo empréstimo de uma cópia de livro por um usuário.
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCopyId:
 *                 type: integer
 *                 description: ID da cópia do livro a ser emprestada
 *               userId:
 *                 type: integer
 *                 description: ID do usuário que está pegando emprestado
 *               loanDate:
 *                 type: string
 *                 format: date
 *                 description: Data do empréstimo
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Data prevista para devolução
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authenticate, LoanController.createLoan);

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Retorna todos os empréstimos com paginação
 *     description: Lista todos os empréstimos cadastrados no sistema com suporte a paginação.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página (começa em 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número máximo de empréstimos por página.
 *     responses:
 *       200:
 *         description: Lista de empréstimos retornada com sucesso
 */
router.get("/", authenticate, LoanController.getAllLoans);

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Retorna um empréstimo específico
 *     description: Busca os detalhes de um empréstimo pelo ID.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo encontrado com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 */
router.get("/:id", authenticate, LoanController.getLoan);

/**
 * @swagger
 * /loans/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     description: Atualiza as informações de um empréstimo existente.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Nova data de devolução
 *               status:
 *                 type: string
 *                 enum: [PENDING, RETURNED]
 *                 description: Status do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Empréstimo não encontrado
 */
router.put("/:id", authenticate, LoanController.updateLoan);

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Exclui um empréstimo
 *     description: Remove um empréstimo do sistema pelo ID.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo a ser excluído
 *     responses:
 *       200:
 *         description: Empréstimo excluído com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 */
router.delete("/:id", authenticate, LoanController.deleteLoan);

/**
 * @swagger
 * /loans/user/{userId}:
 *   get:
 *     summary: Retorna empréstimos por ID do usuário
 *     description: Busca todos os empréstimos feitos por um usuário específico pelo ID do usuário.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Empréstimos encontrados com sucesso
 *       404:
 *         description: Nenhum empréstimo encontrado para este usuário
 */
router.get("/user/:userId", authenticate, LoanController.getLoansByUserId);

/**
 * @swagger
 * /loans/book/{bookCopyId}:
 *   get:
 *     summary: Retorna empréstimos por ID da cópia do livro
 *     description: Busca todos os empréstimos associados a uma cópia específica de um livro pelo ID da cópia do livro.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: bookCopyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cópia do livro
 *     responses:
 *       200:
 *         description: Empréstimos encontrados com sucesso
 *       404:
 *         description: Nenhum empréstimo encontrado para esta cópia do livro
 */
router.get("/book/:bookCopyId", authenticate, LoanController.getLoansByBookCopyId);

/**
 * @swagger
 * /loans/status/{status}:
 *   put:
 *     summary: Atualiza empréstimos por status
 *     description: Atualiza o status de empréstimos com base no status fornecido.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [PENDING, RETURNED]
 *         description: Status dos empréstimos a serem atualizados
 *     responses:
 *       200:
 *         description: Status dos empréstimos atualizado com sucesso
 *       404:
 *         description: Nenhum empréstimo encontrado para o status fornecido
 */
router.put("/status/:status", authenticate, LoanController.getLoansByStatus);

export default router;
