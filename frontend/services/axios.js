import axios from "axios";

const api = axios.create({
  baseURL: "http://sua-api.com",
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const newAccessToken = await refreshAccessToken(refreshToken);
      localStorage.setItem("accessToken", newAccessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post("http://sua-api.com/refresh-token", {
      token: refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Não foi possível atualizar o token de acesso", error);
    // Redirecionar para a página de login ou lidar com o erro de outra forma
  }
}

export default api;
