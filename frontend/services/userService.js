import axios from "axios";

const API_URL = "http://localhost:3001/usuarios";

const userService = {
  register: async (nome, email, senha) => {
    try {
      const response = await axios.post(API_URL, { nome, email, senha });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao registrar usuário");
    }
  },

  login: async (email, senha) => {
    try {
      const response = await axios.get(`${API_URL}/login`, {
        params: { email, senha },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao logar usuário");
    }
  },

  update: async (id, nome, email, senha, apelido, profissao, avatar, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { nome, email, senha, apelido, profissao, avatar },
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
