"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import Link from "next/link";
import userService from "../../services/userService";
import { useRouter } from "next/navigation";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  textField: {
    "& .MuiFilledInput-root": {
      backgroundColor: "#2f2f34",
      "&:hover": {
        backgroundColor: "#3a3a3f",
      },
      "&.Mui-focused": {
        backgroundColor: "#3a3a3f",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(email, senha);
      localStorage.setItem("user", JSON.stringify(response));
      setAlertMessage(response.message);
      setAlertSeverity("success");
      setOpen(true);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#232328",
          paddingTop: 6,
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ color: "#fff" }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: 500 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            className={classes.textField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="filled"
            className={classes.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
          >
            Entrar
          </Button>
          <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
            Não possui uma conta?{" "}
            <Link style={{ color: "#4468CF" }} href="/">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
