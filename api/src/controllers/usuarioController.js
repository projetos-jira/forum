const usuarioService = require("../services/usuarioService");

usuarioController = {
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha } = req.body;

    const resultado = await usuarioService.cadastrarUsuario(nome, email, senha);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(201).json(resultado);
  },
};

module.exports = usuarioController;
