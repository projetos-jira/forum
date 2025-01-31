import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import postsSkeleton from "../Skeletons/PostsSkeleton";
import { useRouter } from "next/navigation";

const Timeline = ({ width, fetchPosts }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser;
    setUser(user.usuario);
  }, []);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, [fetchPosts]);

  const handlePostClick = (id) => {
    router.push(`/posts/${id}`);
  };

  const renderedPosts = posts.map((post) => (
    <Card
      key={post.id}
      onClick={() => handlePostClick(post.id)}
      sx={{
        backgroundColor: "#2f2f34",
        borderRadius: 8,
        margin: 6,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
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
                <Typography variant="subtitle">@{user.apelido}</Typography>
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
          <FavoriteIcon sx={{ mt: 3 }} />
          <Typography variant="h6" sx={{ ml: 1, mt: 2.5 }}>
            {post.qtd_curtidas}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));
  return (
    <>
      <Box
        sx={{
          width,
        }}
      >
        {error && (
          <Typography
            variant="h5"
            color="error"
            sx={{
              textAlign: "center",
              m: 6,
            }}
          >
            {error}
          </Typography>
        )}
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
      </Box>
    </>
  );

  function loadingPosts() {
    return postsSkeleton();
  }
};

export default Timeline;
