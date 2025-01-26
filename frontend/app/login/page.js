"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import userService from "../../services/userService";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, senha);
      const response = await userService.login(email, senha);
      alert("Usuário logado com sucesso!");
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Typography variant="body2" align="center">
              Não possui uma conta? <Link href="/">Faça cadastro</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
