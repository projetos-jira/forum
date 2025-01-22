const Post = require("../model/Post");
const Curtidas = require("../model/Curtidas");

const postService = {
  criarPost: async (titulo, conteudo, user_id) => {
    if (!titulo || !conteudo || !user_id) {
      return { erro: "Envie todos os campos obrigatórios." };
    }
    if (titulo.length < 3) {
      return { erro: "O título deve ter pelo menos 3 caracteres." };
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
        order = [["qtd_curtidas", "DESC"]];
        break;
      case "asc":
        order = [["createdAt", "ASC"]];
        break;
      case "desc":
        order = [["createdAt", "DESC"]];
        break;
      default:
        order = [["createdAt", "DESC"]];
    }
    try {
    const resultado = await Post.findAll({
      include: {
        model: Usuario,
        as: "usuario",
        attributes: ["avatar", "apelido"],
      },
        order,
      });
      return posts;
    } catch (error) {
      return { erro: error.message };
    }
  },
  atualizarPost: async (id, titulo, conteudo) => {
    if (!id) return { erro: "Envie o id do post." };
    if (!titulo && !conteudo) {
      return { erro: "Envie pelo menos um campo para atualizar." };
    }
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };

      if (titulo) post.titulo = titulo;
      if (conteudo) post.conteudo = conteudo;

      await post.save();
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPostPorId: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  deletarPost: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      await post.destroy();
      return { message: "Post deletado com sucesso." };
    } catch (error) {
      return { erro: error.message };
    }
  },
  obterUserIdDoPost: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  curtirPost: async (id, userId) => {
    try {
      await Curtidas.create({ post_id: id, user_id: userId });
      const userJaCurtiu = await Curtidas.findOne({
        where: { post_id: id, user_id: userId },
      });
      if (userJaCurtiu) return { erro: "Usuário já curtiu esse post." };

      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };

      post.qtd_curtidas += 1;
      await post.save();

      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = postService;
