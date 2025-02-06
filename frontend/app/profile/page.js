"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProfileContent from "../../components/Profile/ProfileContent";
import Posts from "../../components/Posts/Posts";
import AddPostButton from "../../components/Buttons/AddPostButton";
import userService from "../../services/userService";

const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    setPosts(posts);
  }, []);

  const fetchUserPosts = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser.id;
      const data = await userService.listarPosts(userId);
      return Array.isArray(data.Posts) ? data.Posts : [];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <Box component="main">
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#232328",
        }}
      >
        <ProfileContent />
        <Typography variant="h4" sx={{ color: "#fff", mt: 6 }}>
          Meus posts ({posts.length}) 📝
        </Typography>
        <Posts width={"70%"} fetchPosts={fetchUserPosts} profilePost={true} />
        <AddPostButton />
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;
