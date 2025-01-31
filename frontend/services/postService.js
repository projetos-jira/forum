import axios from "axios";

const API_URL = "http://localhost:3001/posts";

const postService = {
  criarPost: async (titulo, conteudo, user_id, token) => {
    try {
      const response = await axios.post(
        API_URL,
        { titulo, conteudo, user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao criar post");
    }
  },

  listarPosts: async (filtro) => {
    try {
      const response = await axios.get(API_URL, {
        params: { filtro },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao listar posts");
    }
  },

  atualizarPost: async (id, titulo, conteudo, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { titulo, conteudo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao atualizar post");
    }
  },

  listarPostPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao obter post");
    }
  },

  deletarPost: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao deletar post");
    }
  },

  curtirPost: async (id, userId, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/curtir`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao curtir post");
    }
  },
};

export default postService;
