const comentarioService = require("../services/comentarioService");

const comentarioController = {
  criarComentario: async (req, res) => {
    const { conteudo, user_id } = req.body;
    const { postId } = req.params;

    if (!user_id) {
      return res.status(400).json({ erro: "User ID não fornecido" });
    }
    const resultado = await comentarioService.criarComentario(
      postId,
      conteudo,
      user_id
    );
    if (resultado.erro) return res.status(400).json({ erro: resultado.erro });
    res.status(201).json(resultado);
  },
  buscarComentarios: async (req, res) => {
    const { postId } = req.params;
    const comentarios = await comentarioService.buscarComentarios(postId);
    res.status(200).json(comentarios);
  },
  curtirComentario: async (req, res) => {
    const { comentarioId } = req.params;
    const resultado = await comentarioService.curtirComentario(comentarioId);
    if (resultado.erro) return res.status(400).json(resultado);
    res.status(200).json({
      message: "Comentário curtido com sucesso.",
      comentario: resultado,
    });
  },
};

module.exports = comentarioController;
