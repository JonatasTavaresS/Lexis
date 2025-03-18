import { Router } from "express";
import { BookCopyController } from "../controllers/bookCopyController";
import { authenticate } from '../middlewares/authMiddleware';
/**
 * @swagger
 * tags:
 *   name: Cópias de Livros
 *   description: Endpoints para gerenciamento de cópias de livros na plataforma Lexis
 */
const router = Router();

/**
 * @swagger
 * /bookCopies:
 *   post:
 *     summary: Cria uma nova cópia de livro
 *     description: Adiciona uma nova cópia de um livro específico ao sistema.
 *     tags: [Cópias de Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - status
 *               - condition
 *               - acquisitionDate
 *               - location
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID do livro ao qual esta cópia pertence
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, BORROWED, RESERVED]
 *                 description: Status atual da cópia do livro
 *               condition:
 *                 type: string
 *                 enum: [NEW, GOOD, WORN, DAMAGED]
 *                 description: Estado físico da cópia do livro
 *               acquisitionDate:
 *                 type: string
 *                 format: date
 *                 description: Data de aquisição da cópia do livro
 *               location:
 *                 type: string
 *                 description: Localização da cópia na biblioteca
 *     responses:
 *       201:
 *         description: Cópia de livro criada com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 */
router.post("/", authenticate, BookCopyController.createBookCopy);

/**
 * @swagger
 * /bookCopies:
 *   get:
 *     summary: Retorna todas as cópias de livros
 *     description: Recupera uma lista de todas as cópias de livros cadastradas no sistema.
 *     tags: [Cópias de Livros]
 *     responses:
 *       200:
 *         description: Lista de cópias de livros recuperada com sucesso
 */
router.get("/", authenticate, BookCopyController.getAllBookCopies);

/**
 * @swagger
 * /bookCopies/{id}:
 *   get:
 *     summary: Retorna uma cópia de livro específica
 *     description: Busca uma cópia de livro pelo seu identificador único.
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cópia de livro
 *     responses:
 *       200:
 *         description: Cópia de livro encontrada com sucesso
 *       404:
 *         description: Cópia de livro não encontrada
 */
router.get("/:id", authenticate, BookCopyController.getBookCopy);

/**
 * @swagger
 * /bookCopies/book/{bookId}:
 *   get:
 *     summary: Retorna cópias de livros por ID do livro
 *     description: Busca todas as cópias de um livro específico pelo ID do livro.
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Cópias de livros encontradas com sucesso
 *       404:
 *         description: Nenhuma cópia encontrada para este livro
 */
router.get("/book/:bookId", authenticate, BookCopyController.getBookCopiesByBookId);

/**
 * @swagger
 * /bookCopies/{id}:
 *   put:
 *     summary: Atualiza uma cópia de livro
 *     description: Modifica os detalhes de uma cópia de livro existente.
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cópia de livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, BORROWED, RESERVED]
 *               condition:
 *                 type: string
 *                 enum: [NEW, GOOD, WORN, DAMAGED]
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cópia de livro atualizada com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 *       404:
 *         description: Cópia de livro não encontrada
 */
router.put("/:id", authenticate, BookCopyController.updateBookCopy);

/**
 * @swagger
 * /bookCopies/{id}:
 *   delete:
 *     summary: Remove uma cópia de livro
 *     description: Exclui uma cópia de livro do sistema.
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cópia de livro
 *     responses:
 *       200:
 *         description: Cópia de livro removida com sucesso
 *       404:
 *         description: Cópia de livro não encontrada
 */
router.delete("/:id", authenticate, BookCopyController.deleteBookCopy);

/**
 * @swagger
 * /bookCopies/book/{bookId}:
 *   get:
 *     summary: Retorna cópias de livros por ID do livro
 *     description: Busca todas as cópias de um livro específico pelo ID do livro.
 *     tags: [Cópias de Livros]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Cópias de livros encontradas com sucesso
 *       404:
 *         description: Nenhuma cópia encontrada para este livro
 */
router.get("/book/:bookId", authenticate, BookCopyController.getBookCopiesByBookId);

export default router;
