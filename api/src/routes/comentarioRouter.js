const express = require("express");
const comentarioController = require("../controllers/comentarioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/posts/:postId/comentarios/",
  authMiddleware,
  comentarioController.criarComentario
);

router.get(
  "/posts/:postId/comentarios/",
  comentarioController.buscarComentarios
);

router.put(
  "/posts/comentarios/:comentarioId/curtir",
  authMiddleware,
  comentarioController.curtirComentario
);

module.exports = router;
