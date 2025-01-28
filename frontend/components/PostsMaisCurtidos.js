import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import postService from "../services/postService";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MaisCurtidos = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await postService.listarPosts("mais-curtidos", token);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#2f2f34",
        borderRadius: 8,
        ml: 6,
        mt: 6,
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", mb: 3 }}>
        Posts Mais Curtidos
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {posts.map((post) => (
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
      ))}
    </Box>
  );
};

export default MaisCurtidos;
