const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, postController.criarPost);
router.get("/", postController.listarPosts);
router.put("/:id", authMiddleware, postController.atualizarPost);
router.get("/:id", postController.listarPostPorId);

module.exports = router;
