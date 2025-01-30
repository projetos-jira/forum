"use client";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProfileContent from "../../components/Profile/ProfileContent";
import Timeline from "../../components/Posts/TimeLine";
import AddPostButton from "../../components/Buttons/AddPostButton";
import userService from "../../services/userService";

const Profile = () => {
  const fetchUserPosts = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser.usuario.id;
      const token = storedUser.token;
      const data = await userService.listPosts(userId, token);
      return data;
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
          Meus posts
        </Typography>
        <Timeline width={"50%"} fetchPosts={fetchUserPosts} />
        <AddPostButton />
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;
