const Usuario = require("../model/Usuario");

const usuarioService = {
  cadastrarUsuario: async (nome, email, senha) => {
    if (!nome || !email || !senha)
      return { erro: "Envie todos os campos obrigatórios" };

    try {
      const resultado = await Usuario.create({ nome, email, senha });
      if (resultado.erro) return { erro: resultado.erro };
      return resultado;
    } catch (err) {
      return { erro: err.message };
    }
  },
  logarUsuario: async (email, senha) => {
    if (!email || !senha) return { erro: "Envie todos os campos obrigatórios" };

    try {
      const resultado = await Usuario.findOne({ where: { email, senha } });
      if (!resultado) return { erro: "Usuário não encontrado" };
      return resultado;
    } catch (err) {
      return { erro: err.message };
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
    if (!id) return { erro: "Envie o id do usuário" };
    if (!nome && !email && !senha && !apelido && !profissao && !avatar)
      return { erro: "Envie ao menos um campo para atualizar" };
    try {
      const resultado = await Usuario.update(
        { nome, email, senha, apelido, profissao, avatar },
        { where: { id } }
      );
      if (resultado.erro) return { erro: resultado.erro };
      return resultado;
    } catch (err) {
      return { erro: err.message };
    }
  },
};

module.exports = usuarioService;
