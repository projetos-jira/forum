"use client";

import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import PostsMaisCurtidos from "../../components/PostsMaisCurtidos";
import Timeline from "../../components/TimeLine";
import AddPostButton from "../../components/AddPostButton";
import "../../styles/home.css";

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
    <>
      <CssBaseline />
      <Header />
      <Box className="container">
        <Box className="left-column">
          <PostsMaisCurtidos />
        </Box>
        <Box className="center-column">
          <Timeline />
        </Box>
        <Box>
          <AddPostButton />
        </Box>
      </Box>
    </>
  );
};

export default Home;
