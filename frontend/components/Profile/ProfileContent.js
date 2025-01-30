import { Box, Avatar, Typography, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
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

const ProfileContent = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [apelido, setApelido] = useState("");
  const [profissao, setProfissao] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user.usuario);
      setNome(user.usuario.nome || "");
      setEmail(user.usuario.email || "");
      setApelido(user.usuario.apelido || "");
      setProfissao(user.usuario.profissao || "");
    }
  }, []);

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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
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
          value={profissao}
          onChange={(e) => setProfissao(e.target.value)}
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
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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
    </Box>
  );
};

export default ProfileContent;
