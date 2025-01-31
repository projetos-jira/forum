"use client";

import postService from "../../../services/postService";
import PostComents from "../../../components/Posts/PostComents";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PostDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser;
    setUser(user);
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await postService.listarPostPorId(id);
        setPost(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <Box component="main">
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#232328",
        }}
      >
        {post && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              key={post.id}
              sx={{
                backgroundColor: "#2f2f34",
                margin: 6,
                width: "100%",
                borderRadius: 8,
              }}
            >
              <CardContent
                className="card-content"
                sx={{
                  backgroundColor: "#2f2f34",
                  height: 300,
                  padding: 6,
                  color: "#fff",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    mb: 2,
                  }}
                >
                  {post.usuario ? (
                    <>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={`http://localhost:3000/usuarios/${post.usuario.id}/avatar`}
                          alt={post.usuario.apelido}
                          sx={{
                            marginRight: 1,
                            color: "#2f2f34",
                            height: 50,
                            width: 50,
                          }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="subtitle">
                            @{post.usuario.apelido}
                          </Typography>
                          <Typography variant="subtitle2">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
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
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle">
                          @{user.apelido}
                        </Typography>
                        <Typography variant="subtitle2">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  {post.titulo}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "light",
                  }}
                >
                  {post.conteudo}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FavoriteBorderIcon sx={{ mt: 3 }} />
                  <Typography variant="h6" sx={{ ml: 1, mt: 2.5 }}>
                    {post.qtd_curtidas}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        <PostComents postId={id} />
      </Box>
      <Footer />
    </Box>
  );
};

export default PostDetail;
