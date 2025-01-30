"use client";

import { Box } from "@mui/material";
import Header from "../../components/Layout/Header";
import PostsMaisCurtidos from "../../components/Posts/PostsMaisCurtidos";
import Timeline from "../../components/Posts/TimeLine";
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
        <Timeline width={"60%"} fetchPosts={fetchTimeLinePosts} />
        <AddPostButton />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
