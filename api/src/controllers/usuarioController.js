const usuarioService = require("../services/usuarioService");

const usuarioController = {
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha } = req.body;

    const resultado = await usuarioService.cadastrarUsuario(nome, email, senha);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: resultado,
    });
  },
  logarUsuario: async (req, res) => {
    const { email, senha } = req.query;
    console.log(email, senha);

    const resultado = await usuarioService.logarUsuario(email, senha);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(200).json({
      message: "Usuário logado com sucesso",
      usuario: resultado,
    });
  },
  atualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, apelido, profissao, avatar } = req.body;

    const resultado = await usuarioService.atualizarUsuario(
      id,
      nome,
      email,
      senha,
      apelido,
      profissao,
      avatar
    );
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
    });
  },
};

module.exports = usuarioController;
