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
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPosts: async (filtro) => {
    let order;
    switch (filtro) {
      case "mais-curtidos":
        order = [["curtidas", "DESC"]];
        break;
      case "asc":
        order = [["created_At", "ASC"]];
        break;
      default:
        order = [["created_At", "DESC"]];
    }
    try {
      const resultado = await Post.findAll({
        limit: 10,

        include: {
          model: Usuario,
          as: "usuario",
          attributes: ["avatar", "apelido"],
        },
        order,
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
    if (titulo.length < 3) {
      return { erro: "O título deve ter no mínimo 3 caracteres." };
    }
    try {
      const resultado = await Post.update(
        { titulo, conteudo },
        { where: { id } }
      );
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPostPorId: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.findByPk(id);
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  deletarPost: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.destroy({ where: { id } });
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  obterUserIdDoPost: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.findByPk(id);
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  curtirPost: async (id) => {
    if (!id) return { erro: "Envie o id do post." };
    try {
      const resultado = await Post.findByPk(id);
      if (!resultado) return { erro: "Post não encontrado." };
      resultado.qtd_curtidas += 1;
      await resultado.save();
      return resultado;
    } catch (err) {
      return { erro: err.message };
    }
  },
};

module.exports = postService;
