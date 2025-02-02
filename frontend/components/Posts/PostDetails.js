import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import postService from "../../services/postService";

const PostDetails = ({ post }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.user);
      setToken(storedUser.token);
    }
  }, []);

  useEffect(() => {
    if (post && user?.id) {
      const liked = (post.Curtidas || []).some(
        (curtida) => curtida.user_id === user.id
      );
      setCurtido(liked);
    }
  }, [post, user]);

  const handleCurtirPost = async () => {
    if (!post) return;

    try {
      const isLiked = (post.Curtidas || []).some(
        (curtida) => curtida.user_id === user.id
      );

      if (isLiked) {
        await postService.removerCurtida(post.id, user.id, token);
        post.qtd_curtidas -= 1;
        post.Curtidas = post.Curtidas.filter(
          (curtida) => curtida.user_id !== user.id
        );
        setCurtido(false);
      } else {
        await postService.curtirPost(post.id, user.id, token);
        post.qtd_curtidas += 1;
        post.Curtidas.push({ user_id: user.id });
        setCurtido(true);
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: error.message,
        severity: "error",
        open: true,
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  if (!post) return <Typography>Carregando...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 6,
      }}
    >
      <Card
        sx={{
          backgroundColor: "#2f2f34",
          borderRadius: 8,
          width: "70%",
        }}
      >
        <CardContent sx={{ color: "#fff", padding: 6 }}>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Avatar
              sx={{
                marginRight: 1,
                color: "#2f2f34",
                height: 50,
                width: 50,
              }}
            >
              {post.Usuario?.apelido[0].toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle">
                @{post.Usuario?.apelido}
              </Typography>
              <Typography variant="subtitle2">
                {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            {post.titulo}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "light" }}>
            {post.conteudo}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <IconButton onClick={handleCurtirPost}>
              {post.Curtidas?.some((curtida) => curtida.user_id === user.id) ? (
                <FavoriteIcon sx={{ color: "white" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "white" }} />
              )}
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, mt: 1 }}>
              {post.qtd_curtidas}
            </Typography>
          </Box>
        </CardContent>
      </Card>

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

export default PostDetails;
