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
};

module.exports = usuarioService;
