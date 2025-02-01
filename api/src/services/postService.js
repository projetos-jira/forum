const Post = require("../model/Post");
const Usuario = require("../model/User");
const Comentario = require("../model/Comentario");
const PostCurtidas = require("../model/PostCurtidas");
const ComentarioCurtidas = require("../model/ComentarioCurtidas");

const postService = {
  criarPost: async (titulo, conteudo, user_id) => {
    if (!titulo || !conteudo || !user_id) {
      return { erro: "Envie todos os campos obrigatórios." };
    }
    if (titulo.length < 3) {
      return { erro: "O título deve ter pelo menos 3 caracteres." };
    }
    try {
      const post = await Post.create({ titulo, conteudo, user_id });
      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPosts: async (filtro) => {
    let order;
    let limit = 10;
    switch (filtro) {
      case "mais-curtidos":
        order = [["qtd_curtidas", "DESC"]];
        limit = 5;
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
      const posts = await Post.findAll({
        include: {
          model: Usuario,
          as: "Usuario",
          attributes: ["avatar", "apelido"],
        },
        order,
        limit,
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
  listarUmPost: async (id) => {
    try {
      const post = await Post.findOne({
        where: { id },
        include: [
          {
            model: Usuario,
            as: "Usuario",
            attributes: ["apelido", "avatar"],
          },
          {
            model: Comentario,
            as: "Comentarios",
            attributes: ["conteudo", "createdAt", "qtd_curtidas", "id"],
            include: {
              model: Usuario,
              as: "Usuario",
              attributes: ["apelido", "avatar"],
            },
            include: {
              model: ComentarioCurtidas,
              as: "Curtidas",
              attributes: ["user_id"],
            },
          },
          {
            model: PostCurtidas,
            as: "Curtidas",
            attributes: ["user_id"],
          },
        ],
      });

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

  curtirPost: async (post_id, user_id) => {
    if (!post_id || !user_id) {
      return { erro: "Envie o id do post e o id do usuário." };
    }
    try {
      const post = await Post.findByPk(post_id);
      if (!post) return { erro: "Post não encontrado." };

      const user = await Usuario.findByPk(user_id);
      if (!user) return { erro: "Usuário não encontrado." };
      const userJaCurtiu = await PostCurtidas.findOne({
        where: { post_id, user_id },
      });

      if (userJaCurtiu) return { erro: "Post já curtido" };

      await PostCurtidas.create({ post_id, user_id });

      post.qtd_curtidas += 1;
      await post.save();

      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
  removerCurtida: async (id, userId) => {
    if (!id || !userId) {
      return { erro: "Envie o id do post e o id do usuário." };
    }
    try {
      const post = await Post.findByPk(id);
      if (!post) return { erro: "Post não encontrado." };
      const user = await Usuario.findByPk(userId);
      if (!user) return { erro: "Usuário não encontrado." };

      const curtida = await PostCurtidas.findOne({
        where: { post_id: id, user_id: userId },
      });
      if (!curtida) return { erro: "Curtida não encontrada." };

      await curtida.destroy();

      post.qtd_curtidas -= 1;
      await post.save();

      return post;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = postService;
