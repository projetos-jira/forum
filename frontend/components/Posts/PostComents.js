import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Snackbar, Alert } from "@mui/material";
import comentarioService from "../../services/comentarioService";

const PostComents = ({ post }) => {
  const [user, setUser] = useState({});
  const [comentarios, setComentarios] = useState(post.Comentarios || []);
  const [novoComentario, setNovoComentario] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (post && post.Comentarios) setComentarios(post.Comentarios);
  }, [post]);

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
      const comentarioAdicionado = await comentarioService.criarComentario(
        post.id,
        novoComentario,
        user.id
      );

      setComentarios([
        {
          id: comentarioAdicionado.id,
          conteudo: novoComentario,
          Usuario: { apelido: user.apelido, id: user.id },
          createdAt: new Date(),
          qtd_curtidas: 0,
          Curtidas: [],
        },
        ...comentarios,
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

  const handleCurtirComentario = async (comentarioId) => {
    try {
      const comentario = comentarios.find(
        (comentario) => comentario.id === comentarioId
      );

      const isCurtido = comentario.Curtidas.some(
        (curtida) => curtida.user_id === user.id
      );

      if (isCurtido) {
        await comentarioService.descurtirComentario(comentarioId, user.id);

        const updatedComentarios = comentarios.map((comentario) => {
          if (comentario.id === comentarioId) {
            return {
              ...comentario,
              qtd_curtidas: comentario.qtd_curtidas - 1,
              Curtidas: comentario.Curtidas.filter(
                (curtida) => curtida.user_id !== user.id
              ),
            };
          }
          return comentario;
        });

        setComentarios(updatedComentarios);
      } else {
        await comentarioService.curtirComentario(comentarioId, user.id);

        const updatedComentarios = comentarios.map((comentario) => {
          if (comentario.id === comentarioId) {
            return {
              ...comentario,
              qtd_curtidas: comentario.qtd_curtidas + 1,
              Curtidas: [...comentario.Curtidas, { user_id: user.id }],
            };
          }
          return comentario;
        });
        setComentarios(updatedComentarios);
      }
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
        minHeight: "25vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <Avatar
          sx={{ marginRight: 1, color: "#2f2f34", height: 50, width: 50 }}
        >
          {user.apelido ? user.apelido[0].toUpperCase() : "U"}
        </Avatar>
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
          width: "50%",
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

      <Box sx={{ width: "50%" }}>
        {comentarios && comentarios.length > 0 ? (
          comentarios.map((comentario) => (
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
                    sx={{
                      marginRight: 1,
                      color: "#2f2f34",
                      height: 50,
                      width: 50,
                    }}
                  >
                    {comentario.Usuario?.apelido[0].toUpperCase()}
                  </Avatar>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle">
                      @{comentario.Usuario?.apelido || "Desconhecido"}
                    </Typography>
                    <Typography variant="subtitle2">
                      {new Date(comentario.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {comentario.conteudo}
                </Typography>
                <Box
                  onClick={() => handleCurtirComentario(comentario.id)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {comentario.Curtidas.some(
                    (curtida) => curtida.user_id === user.id
                  ) ? (
                    <FavoriteIcon sx={{ mt: 1 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ mt: 1 }} />
                  )}
                  <Typography variant="h6" sx={{ ml: 2, mt: 0.5 }}>
                    {comentario.qtd_curtidas}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
            Nenhum comentário ainda 👎.
          </Typography>
        )}
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
