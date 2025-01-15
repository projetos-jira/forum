const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/", postController.criarPost);
router.get("/", postController.listarPosts);
router.put("/:id", postController.atualizarPost);
router.get("/:id", postController.listarPostPorId);

module.exports = router;
