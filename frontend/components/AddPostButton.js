import React from "react";
import "../styles/addPostButton.css";
import { Box } from "@mui/material";

const AddPostButton = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
      }}
    >
      <button className="add-post-button">+</button>
    </Box>
  );
};

export default AddPostButton;
