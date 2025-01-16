const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", usuarioController.cadastrarUsuario);
router.get("/login", usuarioController.logarUsuario);
router.put("/:id", authMiddleware, usuarioController.atualizarUsuario);
router.get(
  "/posts/:id",
  authMiddleware,
  usuarioController.listarPostsPorUsuario
);

module.exports = router;
