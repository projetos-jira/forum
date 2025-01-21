const Comentario = require("../model/Comentario");

const comentarioService = {
  criarComentario: async (post_id, conteudo, user_id) => {
    if (!post_id || !conteudo) {
      return { erro: "Envie todos os campos obrigatorios." };
    }
    try {
      const resultado = await Comentario.create({
        post_id,
        conteudo,
        user_id,
      });
      return resultado;
    } catch (err) {
      return { err: err.message };
    }
  },
  buscarComentarios: async (post_id) => {
    if (!post_id) {
      return { erro: "Envie o id do post." };
    }
    try {
      const resultado = await Comentario.findAll({
        where: { post_id },
      });
      return resultado;
    } catch (err) {
      return { erro: err.message };
    }
  },
  curtirComentario: async (comentarioId) => {
    if (!comentarioId) return { erro: "Envie o id do comentario." };

    try {
      const comentario = await Comentario.findByPk(comentarioId);
      if (!comentario) return { erro: "Comentario não encontrado." };
      comentario.qtd_curtidas += 1;
      await comentario.save();
      return comentario;
    } catch (err) {
      return { erro: err.message };
    }
  },
};

module.exports = comentarioService;
