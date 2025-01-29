import React from "react";
import { Box, Button } from "@mui/material";

const AddPostButton = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 40,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Button
        sx={{
          backgroundColor: "#2f2f34",
          color: "#fff",
          borderRadius: 100,
          width: 60,
          height: 60,
          fontSize: 40,
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default AddPostButton;
