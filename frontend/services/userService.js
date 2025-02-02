import axios from "axios";

const API_URL = "http://localhost:3001/users";

const userService = {
  register: async (nome, email, senha, apelido) => {
    try {
      const response = await axios.post(API_URL, {
        nome,
        email,
        senha,
        apelido,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao registrar usuário");
    }
  },

  login: async (email, senha) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao logar usuário");
    }
  },

  update: async (id, nome, email, senha, apelido, profissao, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { nome, email, senha, apelido, profissao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao atualizar usuário");
    }
  },

  listPosts: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.erro || "Erro ao listar posts do usuário"
      );
    }
  },
};

export default userService;
