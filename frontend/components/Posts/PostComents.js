import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useState, useEffect } from "react";
import comentarioService from "../../services/comentarioService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Snackbar, Alert } from "@mui/material";

const PostComents = ({ postId }) => {
  const [user, setUser] = useState({});
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser.usuario);
  }, []);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const data = await comentarioService.buscarComentarios(postId);
        setComentarios(data);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchComentarios();
  }, [postId]);

  const handleAdicionarComentario = async () => {
    if (novoComentario.trim() === "") {
      setAlert({
        message: "O comentário não pode estar vazio.",
        severity: "error",
        open: true,
      });
      return;
    }

    try {
      const data = await comentarioService.criarComentario(
        postId,
        novoComentario,
        user.id
      );

      const novoComentarioFormatado = {
        ...data,
        usuario: { id: user.id, apelido: user.apelido },
      };

      setComentarios((prevComentarios) => [
        novoComentarioFormatado,
        ...prevComentarios,
      ]);
      setNovoComentario("");
      setAlert({
        message: "Comentário adicionado com sucesso!",
        severity: "success",
        open: true,
      });
    } catch (error) {
      setAlert({
        message: error.message,
        severity: "error",
        open: true,
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        marginBottom: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "23vh",
      }}
    >
      <Box
        sx={{
          width: "60%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={`http://localhost:3000/usuarios/${user.id}/avatar`}
          alt={user.apelido}
          sx={{
            marginRight: 1,
            color: "#2f2f34",
            height: 50,
            width: 50,
          }}
        />
        <Textarea
          variant="plain"
          placeholder="Adicione um comentário..."
          size="lg"
          name="comentario"
          minRows={1}
          maxRows={4}
          sx={{
            width: "100%",
          }}
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: "60%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleAdicionarComentario}
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Enviar
        </Button>
      </Box>

      <Box sx={{ width: "60%" }}>
        {comentarios.map((comentario) => (
          <Card
            key={comentario.id}
            sx={{
              width: "100%",
              mt: 2,
              backgroundColor: "#2f2f34",
              color: "#fff",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`http://localhost:3000/usuarios/${comentario.usuario?.id}/avatar`}
                  alt={comentario.usuario?.apelido || "Usuário"}
                  sx={{
                    marginRight: 1,
                    color: "#2f2f34",
                    height: 50,
                    width: 50,
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle">
                    @{comentario.usuario?.apelido || "Desconhecido"}
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(comentario.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {comentario.conteudo}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <FavoriteBorderIcon sx={{ mt: 1 }} />
                <Typography variant="h6" sx={{ ml: 2, mt: 0.5 }}>
                  {comentario.qtd_curtidas}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostComents;
