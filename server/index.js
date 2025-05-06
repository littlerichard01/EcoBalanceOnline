// server/index.js
const express = require('express');
const connectDB = require('./database');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/User');

const PORT = process.env.PORT || 3001;
const app = express();

// Conectar ao banco
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API de exemplo
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server and MongoDB!" });
});

// Rota de cadastro
app.post("/api/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar usuário, Preencha todos os campos." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});