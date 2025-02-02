import axios from "axios";

const API_URL = "http://localhost:3001";

const comentarioService = {
  criarComentario: async (post_id, conteudo, user_id) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts/${post_id}/comentarios`,
        { conteudo, user_id, post_id },
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

  curtirComentario: async (comentarioId, user_id, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/comentarios/${comentarioId}/curtir`,
        { user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.erro || "Erro ao curtir comentário");
    }
  },

  descurtirComentario: async (comentarioId, user_id, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/comentarios/${comentarioId}/removerCurtida`,
        { user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.erro || "Erro ao descurtir comentário"
      );
    }
  },

  verificarCurtidaComentario: async (comentarioId, userId, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/${comentarioId}/verificarCurtida`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.curtido;
    } catch (error) {
      throw new Error(
        error.response.data.erro || "Erro ao verificar curtida do comentário"
      );
    }
  },
};

export default comentarioService;
