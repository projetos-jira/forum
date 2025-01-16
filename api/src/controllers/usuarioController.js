const usuarioService = require("../services/usuarioService");

const usuarioController = {
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha } = req.body;

    const resultado = await usuarioService.cadastrarUsuario(nome, email, senha);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      usuario: resultado.usuario,
      token: resultado.token,
    });
  },
  logarUsuario: async (req, res) => {
    const { email, senha } = req.query;

    const resultado = await usuarioService.logarUsuario(email, senha);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(200).json({
      message: "Usuário logado com sucesso.",
      usuario: resultado.usuario,
      token: resultado.token,
    });
  },
  atualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, apelido, profissao, avatar } = req.body;

    if (req.userId !== parseInt(id)) {
      return res.status(403).json({ erro: "Acesso negado." });
    }

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
      message: "Usuário atualizado com sucesso.",
    });
  },
  listarPostsPorUsuario: async (req, res) => {
    const { id } = req.params;

    if (req.userId !== parseInt(id)) {
      return res.status(403).json({ erro: "Acesso negado." });
    }

    const resultado = await usuarioService.listarPostsPorUsuario(id);
    if (resultado.erro) return res.status(400).json(resultado);
    return res.status(200).json({
      message: "Posts do usuário listados com sucesso.",
      posts: resultado,
    });
  },
};

module.exports = usuarioController;
