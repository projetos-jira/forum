import React from "react";
import { useState, useEffect } from "react";
import { InputBase, Avatar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import "../styles/header.css";

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.usuario.nome.split(" ")[0]);
    }
  }, []);

  return (
    <header className="header">
      <div className="home-icon-wrapper">
        <HomeIcon
          className="home-icon"
          style={{ color: "#fff", fontSize: "30px" }}
        />
      </div>
      <div className="search-container">
        <div className="search">
          <InputBase
            placeholder="Pesquisar…"
            className="input-base"
            style={{ color: "#fff" }}
          />
          <div className="search-icon-wrapper">
            <SearchIcon className="search-icon" />
          </div>
        </div>
      </div>
      <div className="avatar-icon-wrapper">
        <PersonIcon
          className="person-icon"
          style={{ color: "#fff", fontSize: "30px" }}
        />
      </div>
      <Typography
        variant="subtitle1"
        style={{ color: "#fff", marginRight: "100px" }}
      >
        Olá, <strong>{userName}</strong>
      </Typography>
    </header>
  );
};

export default Header;
