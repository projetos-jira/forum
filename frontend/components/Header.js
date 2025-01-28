import React from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="search-container">
        <div className="search">
          <div className="search-icon-wrapper">
            <SearchIcon className="search-icon" />
          </div>
          <InputBase placeholder="Pesquisar…" className="input-base" />
        </div>
      </div>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="account of current user"
      >
        <AccountCircleIcon fontSize="large" className="profile-icon" />
      </IconButton>
    </header>
  );
};

export default Header;
