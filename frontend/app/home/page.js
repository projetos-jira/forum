"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import PostsMaisCurtidos from "../../components/PostsMaisCurtidos";
import Timeline from "../../components/TimeLine";
import AddPostButton from "../../components/AddPostButton";

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
      <Box
        className="container"
        sx={{
          display: "flex",
          margin: "0 auto",
          backgroundColor: "#232328",
        }}
      >
        <Box
          sx={{
            width: "20%",
            height: "70vh",
          }}
        >
          <PostsMaisCurtidos />
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
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
