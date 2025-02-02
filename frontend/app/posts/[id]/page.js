"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import postService from "../../../services/postService";
import PostComents from "../../../components/Posts/PostComents";

const PostDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    setUser(user);

    const fetchPost = async () => {
      try {
        const data = await postService.listarUmPost(id);
        setPost(data);
      } catch (error) {
        throw new Error("Erro ao carregar post");
      }
    };

    fetchPost();
  }, [id]);

  return (
    <Box component="main" sx={{ backgroundColor: "#232328" }}>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PostComents post={post} />
      </Box>
      <Footer />
    </Box>
  );
};

export default PostDetail;
