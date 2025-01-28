import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import postService from "../services/postService";

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
    <>
      <Typography
        variant="h6"
        sx={{ color: "#fff", textAlign: "center", mb: 2 }}
      >
        Posts Mais Curtidos
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.titulo}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Curtidas: {post.qtd_curtidas}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MaisCurtidos;
