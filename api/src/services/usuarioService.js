require("dotenv").config();
const Usuario = require("../model/Usuario");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const usuarioService = {
  cadastrarUsuario: async (nome, email, senha) => {
    if (!nome || !email || !senha)
      return { erro: "Envie todos os campos obrigatórios." };

    if (senha.length < 6)
      return { erro: "A senha deve ter no mínimo 6 caracteres." };

    if (nome.length < 3)
      return { erro: "O nome deve ter no mínimo 3 caracteres." };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return { erro: "Email inválido." };

    try {
      const usuarioExiste = await Usuario.findOne({ where: { email } });
      if (usuarioExiste) return { erro: "Email já cadastrado" };
      const resultado = await Usuario.create({ nome, email, senha });

      const token = jwt.sign({ id: resultado.id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { resultado, token };
    } catch (error) {
      return { erro: error.message };
    }
  },
  logarUsuario: async (email, senha) => {
    if (!email || !senha)
      return { erro: "Envie todos os campos obrigatórios." };

    try {
      const usuario = await Usuario.findOne({ where: { email } });
      const token = jwt.sign({ id: usuario.id }, SECRET_KEY, {
        expiresIn: 300,
      });

      return { usuario, token };
    } catch (error) {
      return { erro: error.message };
    }
  },
  atualizarUsuario: async (
    id,
    nome,
    email,
    senha,
    apelido,
    profissao,
    avatar
  ) => {
    if (!id) return { erro: "Envie o id do usuário." };
    if (!nome && !email && !senha && !apelido && !profissao && !avatar)
      return { erro: "Envie ao menos um campo para atualizar." };

    if (senha.length < 6)
      return { erro: "A senha deve ter no mínimo 6 caracteres." };

    if (nome.length < 3)
      return { erro: "O nome deve ter no mínimo 3 caracteres." };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return { erro: "Email inválido." };

    try {
      const usuarioExiste = await Usuario.findOne({ where: { email } });
      if (usuarioExiste) return { erro: "Email já cadastrado." };
      const resultado = await Usuario.update(
        { nome, email, senha, apelido, profissao, avatar },
        { where: { id } }
      );
      return resultado;
    } catch (error) {
      return { erro: error.message };
    }
  },
  listarPostsPorUsuario: async (id) => {
    if (!id) return { erro: "Envie o id do usuário." };
    try {
      const resultado = await Usuario.findByPk(id, {
        include: { association: "posts" },
      });
      return resultado.posts;
    } catch (error) {
      return { erro: error.message };
    }
  },
};

module.exports = usuarioService;
