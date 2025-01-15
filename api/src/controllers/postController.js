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
  atualizarPost: async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    const resultado = await postService.atualizarPost(id, titulo, conteudo);
    if (resultado.erro) return res.status(400).json(resultado);
    res.status(200).json({
      message: "Post atualizado com sucesso",
    });
  },
};

module.exports = postController;
