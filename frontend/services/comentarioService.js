import axios from "axios";

const API_URL = "http://localhost:3001";

const comentarioService = {
  criarComentario: async (postId, conteudo, userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/comentarios/`,
        { conteudo, user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return { erro: error.response ? error.response.data : error.message };
    }
  },

  buscarComentarios: async (postId) => {
    try {
      const response = await axios.get(
        `${API_URL}/posts/${postId}/comentarios/`
      );
      return response.data;
    } catch (error) {
      return { erro: error.response ? error.response.data : error.message };
    }
  },

  curtirComentario: async (comentarioId, userId) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/comentarios/${comentarioId}/curtir`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return { erro: error.response ? error.response.data : error.message };
    }
  },
};

export default comentarioService;
