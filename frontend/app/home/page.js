"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import PostsMaisCurtidos from "../../components/PostsMaisCurtidos";
import Timeline from "../../components/TimeLine";
import AddPostButton from "../../components/AddPostButton";
import Footer from "../../components/Footer";

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
      <Header />
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
    </>
  );
};

export default Home;
