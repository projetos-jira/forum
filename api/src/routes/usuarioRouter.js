const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", usuarioController.cadastrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   get:
 *     summary: Logar um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: senha
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário logado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.get("/login", usuarioController.logarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               apelido:
 *                 type: string
 *               profissao:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */
router.put("/:id", authMiddleware, usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/posts/{id}:
 *   get:
 *     summary: Listar posts de um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de posts do usuário
 *       400:
 *         description: Erro na requisição
 *       403:
 *         description: Acesso negado
 */
router.get(
  "/posts/:id",
  authMiddleware,
  usuarioController.listarPostsPorUsuario
);

module.exports = router;
