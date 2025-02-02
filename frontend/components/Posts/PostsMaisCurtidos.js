import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import postService from "../../services/postService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostsMaisCurtidosSkeleton from "../Skeletons/PostsMaisCurtidosSkeleton";

const MaisCurtidos = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.listarPosts("mais-curtidos");
        setPosts(data);
      } catch (error) {
        setAlert({
          message: "Erro ao carregar posts",
          severity: "error",
          open: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const renderedPosts = posts.map((post) => (
    <Card
      key={post.id}
      sx={{
        marginBottom: 2,
        backgroundColor: "#232328",
        borderRadius: 4,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent className="card-content">
        <Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            {post.titulo}
            <FavoriteIcon
              sx={{
                color: "#fff",
                position: "relative",
                top: 6,
                ml: 1,
                mr: 1,
              }}
            />
            {post.qtd_curtidas}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));
  return (
    <Box
      sx={{
        height: "60vh",
        padding: 4,
        backgroundColor: "#2f2f34",
        borderRadius: 8,
        ml: 6,
        mt: 6,
        width: "20%",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", mb: 3 }}>
        Posts Mais Curtidos
      </Typography>
      {loading ? (
        loadingPosts()
      ) : posts.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            m: 6,
            color: "#fff",
          }}
        >
          Nenhum post encontrado 👎.
        </Typography>
      ) : (
        renderedPosts
      )}
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

  function loadingPosts() {
    return PostsMaisCurtidosSkeleton();
  }
};

export default MaisCurtidos;
