const postService = require("../services/postService");

const postController = {
  criarPost: async (req, res) => {
    const { titulo, conteudo, user_id } = req.body;
    const resultado = await postService.criarPost(titulo, conteudo, user_id);
    if (resultado.erro) return res.status(400).json(resultado);
    res.status(201).json({
      message: "Post criado com sucesso",
      post: resultado,
    });
  },
  listarPosts: async (req, res) => {
    const resultado = await postService.listarPosts();
    if (resultado.erro) return res.status(400).json(resultado);
    res.status(200).json(resultado);
  },
};

module.exports = postController;
