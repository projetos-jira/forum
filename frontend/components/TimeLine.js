import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import postService from "../services/postService";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.listarPosts(null);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {error && <Typography color="error">{error}</Typography>}
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {post.usuario.apelido}
            </Typography>
            <Typography variant="h5">{post.titulo}</Typography>
            <Typography variant="body2" color="textSecondary">
              {post.conteudo}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Curtidas: {post.qtd_curtidas}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Timeline;
