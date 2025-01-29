import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import postService from "../../services/postService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostsMaisCurtidosSkeleton from "../Skeletons/PostsMaisCurtidosSkeleton";

const MaisCurtidos = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await postService.listarPosts("mais-curtidos", token);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        width: "30%",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", mb: 3 }}>
        Posts Mais Curtidos
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? loadingPosts() : renderedPosts}
    </Box>
  );

  function loadingPosts() {
    return PostsMaisCurtidosSkeleton();
  }
};

export default MaisCurtidos;
