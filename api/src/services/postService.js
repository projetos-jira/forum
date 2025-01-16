const Post = require("../model/Post");
const Usuario = require("../model/Usuario");

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
      if (!resultado) return { erro: "Erro ao criar post." };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPosts: async () => {
    try {
      const resultado = await Post.findAll({
        include: {
          model: Usuario,
          as: "usuario",
          attributes: ["avatar", "apelido"],
        },
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
      if (!resultado) return { erro: "Erro ao atualizar post." };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPostPorId: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.findByPk(id);
      if (!resultado) return { erro: "Post não encontrado." };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  obterUserIdDoPost: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.findByPk(id);
      if (!resultado) return { erro: "Post não encontrado." };
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = postService;
