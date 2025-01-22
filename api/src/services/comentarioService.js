const Comentario = require("../model/Comentario");
const Curtidas = require("../model/Curtidas");

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
  curtirComentario: async (comentarioId, userId) => {
    if (!comentarioId || !userId)
      return { erro: "Envie o id do comentario e do usuário." };

    try {
      const userJaCurtiu = await Curtidas.findOne({
        where: { comentario_id: comentarioId, user_id: userId },
      });
      if (userJaCurtiu) return { erro: "Usuário já curtiu esse comentário." };

      await Curtidas.create({ comentario_id: comentarioId, user_id: userId });

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
