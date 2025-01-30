"use client";

import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import userService from "../../services/userService";

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

const ProfileContent = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    apelido: "",
    profissao: "",
    senha: "",
  });
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setFormulario({
      nome: storedUser.usuario.nome || "",
      email: storedUser.usuario.email || "",
      apelido: storedUser.usuario.apelido || "",
      profissao: storedUser.usuario.profissao || "",
      senha: "",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, apelido, profissao, senha } = formulario;

    try {
      const data = await userService.update(
        user.usuario.id,
        nome,
        email,
        senha,
        apelido,
        profissao,
        user.token
      );

      const updatedUser = {
        token: user.token,
        usuario: {
          id: user.usuario.id,
          nome,
          email,
          apelido,
          profissao,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      setAlertMessage(data.message);
      setAlertSeverity("success");
      setOpen(true);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      component="main"
      sx={{
        padding: 6,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#232328",
        color: "#fff",
        borderBottom: "1px solid #2f2f34",
      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
        }}
      />
      <Typography variant="h6">{user.nome}</Typography>
      <Box
        component="form"
        sx={{
          width: "100%",
          width: 500,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          value={formulario.nome}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formulario.email}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="apelido"
          label="Apelido"
          name="apelido"
          autoComplete="apelido"
          value={formulario.apelido}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          variant="filled"
          fullWidth
          id="profissao"
          label="Profissão"
          name="profissao"
          autoComplete="profissao"
          value={formulario.profissao}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="current-password"
          value={formulario.senha}
          onChange={handleChange}
          className={classes.textField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
          size="large"
        >
          Atualizar
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
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
    </Box>
  );
};

export default ProfileContent;
