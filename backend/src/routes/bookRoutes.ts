import { Router } from "express";
import { BookController } from "../controllers/bookController";
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Endpoints para gerenciamento de livros na plataforma Lexis
 */
const router = Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     description: Adiciona um novo livro ao sistema de gerenciamento de bibliotecas.
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - authors
 *             properties:
 *               isbn:
 *                 type: string
 *                 description: Código ISBN do livro (opcional)
 *               title:
 *                 type: string
 *                 description: Título do livro
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de autores
 *               publisher:
 *                 type: string
 *                 description: Editora do livro (opcional)
 *               publishedYear:
 *                 type: integer
 *                 description: Ano de publicação (opcional)
 *               language:
 *                 type: string
 *                 description: Idioma do livro (opcional)
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Gênero(s) do livro (opcional)
 *               coverImageUrl:
 *                 type: string
 *                 description: URL da imagem da capa (opcional)
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 */
router.post("/", BookController.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retorna todos os livros com paginação
 *     description: Recupera uma lista de todos os livros cadastrados no sistema com suporte a paginação.
 *     tags: [Livros]
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
 *         description: Número máximo de livros por página.
 *     responses:
 *       200:
 *         description: Lista de livros recuperada com sucesso
 */
router.get("/", authenticate, BookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retorna um livro específico
 *     description: Busca um livro pelo seu identificador único.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.get("/:id", authenticate, BookController.getBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     description: Modifica os detalhes de um livro existente.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *               title:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *               publisher:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               language:
 *                 type: string
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               coverImageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Erro nos parâmetros enviados
 *       404:
 *         description: Livro não encontrado
 */
router.put("/:id", authenticate, BookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove um livro
 *     description: Exclui um livro do sistema.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete("/:id", authenticate, BookController.deleteBook);

export default router;
