const Usuario = require("../model/Usuario");

const usuarioService = {
  cadastrarUsuario: async (nome, email, senha) => {
    if (!nome || !email || !senha)
      return { erro: "Envie todos os campos obrigatórios" };

    const usuario = { nome, email, senha };

    try {
      const resultado = await Usuario.create(usuario);
      if (resultado.erro) return { erro: resultado.erro };
      return resultado;
    } catch (err) {
      return { erro: "Erro ao cadastrar usuário" };
    }
  },
};

module.exports = usuarioService;
