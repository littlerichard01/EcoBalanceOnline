// server/index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const connectDB = require('./database');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/User');
const Rotina = require('./models/Rotina');
const TesteDeUsuario = require('./models/TesteDeUsuario');

const PORT = process.env.PORT || 3001;
const app = express();

const SALT_ROUNDS = 10;

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
  const { nome, email, senha, receberLembretes } = req.body;

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      receberLembretes: receberLembretes || false
    });

    await novoUsuario.save();

    // Retornar dados úteis do usuário para o frontend
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      _id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar usuário, Preencha todos os campos." });
  }
});

// Rota de login
app.post("/api/login", async (req, res) => {
  const { _id, email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.status(200).json({ message: "Login realizado com sucesso!", _id: usuario._id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor ao tentar login" });
  }
});

// Rota para atualizar as informações do usuário
app.put("/api/usuarios/:id", async (req, res) => {
  const { nome, email, senha, senhaAntiga, receberLembretes } = req.body;
  const usuarioId = req.params.id; // ID do usuário que está fazendo a requisição

  try {
    // Verifica se o usuário existe
    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica se a senha antiga está correta (se a senha nova for fornecida)
    if (senha && senhaAntiga) {
      const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ error: "Senha antiga incorreta" });
      }

      // Criptografa a nova senha
      const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);
      usuario.senha = senhaCriptografada;
    }

    // Atualiza as outras informações (nome e email)
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (typeof receberLembretes === 'boolean') {
      usuario.receberLembretes = receberLembretes;
    }

    // Salva as alterações no banco de dados
    await usuario.save();

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
});



// Buscar dados de um usuário específico
app.get("/api/usuariosBuscar/:id", async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// Rota para salvar uma nova rotina
app.post("/api/rotinas", async (req, res) => {
  const {
    usuarioId,
    nome,
    dieta,
    porcoes,
    quantidadePessoas,
    tipoGas,
    tipoBotijao,
    tempoDuracaoGas,
    usaVeiculo,
    possuiVeiculo,
    combustivel,
    litrosCombustivel,
    kmEletrico,
    transportesPublicos,
    kmTransportes,
    emissoes
  } = req.body;

  // Validação básica mínima
  if (!usuarioId || !nome || !emissoes) {
    return res.status(400).json({ error: "Retorne as questões e verifique se faltou alguma etapa" });
  }

  try {
    // Verifica se já existe uma rotina com mesmo nome para o mesmo usuário
    let rotinaExistente = await Rotina.findOne({ usuarioId, nome });

    if (rotinaExistente) {
      // Atualiza a rotina existente
      rotinaExistente.set({
        dieta,
        porcoes,
        quantidadePessoas,
        tipoGas,
        tipoBotijao,
        tempoDuracaoGas,
        usaVeiculo,
        possuiVeiculo,
        combustivel,
        litrosCombustivel,
        kmEletrico,
        transportesPublicos,
        kmTransportes,
        emissoes
      });

      await rotinaExistente.save();
      return res.status(200).json({ message: "Rotina atualizada com sucesso!", rotina: rotinaExistente });
    }

    // Cria uma nova rotina se não existir
    const novaRotina = new Rotina({
      usuarioId,
      nome,
      dieta,
      porcoes,
      quantidadePessoas,
      tipoGas,
      tipoBotijao,
      tempoDuracaoGas,
      usaVeiculo,
      possuiVeiculo,
      combustivel,
      litrosCombustivel,
      kmEletrico,
      transportesPublicos,
      kmTransportes,
      emissoes
    });

    await novaRotina.save();
    res.status(201).json(novaRotina);
  } catch (error) {
    console.error("Erro ao salvar/atualizar rotina:", error);
    res.status(500).json({ error: "Erro ao salvar/atualizar rotina no servidor." });
  }
});

// Buscar rotinas de um usuário específico
app.get("/api/rotinas/usuario/:usuarioId", async (req, res) => {
  try {
    const rotinas = await Rotina.find({ usuarioId: req.params.usuarioId });
    res.status(200).json(rotinas);
  } catch (err) {
    console.error("Erro ao buscar rotinas:", err);
    res.status(500).json({ error: "Erro ao buscar rotinas" });
  }
});

// Deletar uma rotina pelo ID
app.delete("/api/rotinas/:id", async (req, res) => {
  try {
    const rotina = await Rotina.findByIdAndDelete(req.params.id);
    if (!rotina) {
      return res.status(404).json({ error: "Rotina não encontrada" });
    }
    res.status(200).json({ message: "Rotina deletada com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar rotina:", err);
    res.status(500).json({ error: "Erro ao deletar rotina" });
  }
});

// Rota para salvar um novo teste de usuário
app.post("/api/testes", async (req, res) => {
  const {
    usuario,
    rotina,
    energiaEletrica,
    gasNatural,
    viagem,
    emissaoAlimentos,
    emissaoGas,
    emissaoVeiculos,
    emissaoTotal
  } = req.body;

  if (!usuario || !rotina || !energiaEletrica || typeof emissaoTotal !== 'number') {
    return res.status(400).json({ error: "Dados obrigatórios ausentes ou inválidos." });
  }

  try {
    const novoTeste = new TesteDeUsuario({
      usuario,
      rotina,
      energiaEletrica,
      gasNatural,
      viagem,
      emissaoAlimentos,
      emissaoGas,
      emissaoVeiculos,
      emissaoTotal
    });

    await novoTeste.save();
    res.status(201).json({ message: "Teste salvo com sucesso!", teste: novoTeste });
  } catch (error) {
    console.error("Erro ao salvar teste:", error);
    res.status(500).json({ error: "Erro ao salvar teste no servidor." });
  }
});

// Buscar testes de um usuário específico
app.get('/api/testes/usuario/:id', async (req, res) => {
  try {
    const testes = await TesteDeUsuario.find({ usuario: req.params.id }).sort({ dataRealizacao: -1 }).populate('rotina');
    res.json(testes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar testes do usuário' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});