"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const Profile = () => {
  return (
    <Box component="main">
      <Header />
      <Box
        sx={{
          display: "flex",

          backgroundColor: "#232328",
        }}
      ></Box>

      <Footer />
    </Box>
  );
};

export default Profile;
