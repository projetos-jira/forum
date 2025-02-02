"use client";

import { Box } from "@mui/material";
import Header from "../../components/Layout/Header";
import PostsMaisCurtidos from "../../components/Posts/PostsMaisCurtidos";
import Posts from "../../components/Posts/Posts";
import AddPostButton from "../../components/Buttons/AddPostButton";
import Footer from "../../components/Layout/Footer";
import postService from "../../services/postService";

const Home = () => {
  const fetchTimeLinePosts = async () => {
    try {
      const data = await postService.listarPosts(null);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Box component="main">
      <Header searchInput={true} />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#232328",
        }}
      >
        <PostsMaisCurtidos />
        <Posts width={"70%"} fetchPosts={fetchTimeLinePosts} />
        <AddPostButton />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
