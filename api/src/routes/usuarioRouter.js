const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const router = express.Router();

router.post("/", usuarioController.cadastrarUsuario);
router.get("/login", usuarioController.logarUsuario);
router.put("/:id", usuarioController.atualizarUsuario);

module.exports = router;
