"use client";

import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../components/Layout/Header";
import PostsMaisCurtidos from "../../components/Posts/PostsMaisCurtidos";
import Timeline from "../../components/Posts/TimeLine";
import AddPostButton from "../../components/Buttons/AddPostButton";
import Footer from "../../components/Layout/Footer";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setUserId(storedUser?.id);
    }
  }, []);

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
        <Timeline width={"60%"} />
        <AddPostButton />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
