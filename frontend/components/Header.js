"use client";

import React, { useState, useEffect } from "react";
import { Box, InputBase, Typography, Button, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.usuario?.nome.split(" ")[0]);
    }
  }, []);

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#232328",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 16px",
        height: "150px",
        borderBottom: "1px solid #2f2f34",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          height: "60px",
          width: "60px",
          backgroundColor: "rgba(47, 47, 52, 1)",
          marginLeft: "100px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Link href="/home">
          <HomeIcon sx={{ color: "#fff", fontSize: "30px" }} />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            width: "50%",
            maxWidth: "600px",
          }}
        >
          <Box
            sx={{
              padding: "0 16px",
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "50px",
            }}
          >
            <SearchIcon
              sx={{
                color: "#fff",
                position: "absolute",
                left: "16px",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </Box>
          <InputBase
            placeholder="Pesquisar…"
            sx={{
              padding: "12px",
              paddingLeft: "50px",
              transition: "width 300ms",
              width: "100%",
              color: "#fff",
              backgroundColor: "#2f2f34",
              fontSize: "16px",
              zIndex: 0,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
          height: "60px",
          width: "60px",
          backgroundColor: "rgba(47, 47, 52, 1)",
          marginRight: "10px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Link href="/profile">
          <PersonIcon sx={{ color: "#fff", fontSize: "30px" }} />
        </Link>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ color: "#fff", marginRight: "100px" }}
      >
        Olá, <strong>{userName || "Convidado"}</strong>
      </Typography>
    </Box>
  );
};

export default Header;
