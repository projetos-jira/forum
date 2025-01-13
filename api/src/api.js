const express = require("express");
const cors = require("cors");
const usuarioRouter = require("./routes/usuarioRouter");
const postRouter = require("./routes/postRouter");
const comentarioRouter = require("./routes/comentarioRouter");

require("./database");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/usuarios", usuarioRouter);
app.use("/posts", postRouter);
app.use("/comentarios", comentarioRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
