const { atualizarPost } = require("../controllers/postController");
const Post = require("../model/Post");

const postService = {
  criarPost: async (titulo, conteudo, user_id) => {
    if (!titulo || !conteudo || !user_id) {
      return { erro: "Preencha todos os campos." };
    }
    if (titulo.length < 3) {
      return { erro: "O título deve ter no mínimo 3 caracteres." };
    }
    try {
      const resultado = await Post.create({ titulo, conteudo, user_id });
      if (resultado.erro) return { erro: resultado.erro };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPosts: async () => {
    try {
      const resultado = await Post.findAll({
        order: [["created_At", "DESC"]],
      });
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  atualizarPost: async (id, titulo, conteudo) => {
    if (!id) return { erro: "Envie o id do post." };
    if (!titulo && !conteudo && !user_id) {
      return { erro: "Envie ao menos um campo para atualizar." };
    }
    try {
      const resultado = await Post.update(
        { titulo, conteudo },
        { where: { id } }
      );
      if (resultado.erro) return { erro: resultado.erro };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = postService;
