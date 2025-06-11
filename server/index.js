// server/index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const connectDB = require('./database');
require('dotenv').config();
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const User = require('./models/User');
const Rotina = require('./models/Rotina');
const TesteDeUsuario = require('./models/TesteDeUsuario');

const PORT = process.env.PORT || 3001;
const app = express();

const SALT_ROUNDS = 10;

const recuperarSenhaRouter = require('./routes/recuperarSenha');
const novaSenhaRouter = require('./routes/novaSenha');

// Conectar ao banco
connectDB();

// Middlewares
app.use(cors({
  origin: 'https://eco-balance-online.vercel.app',
  credentials: true // se você usar cookies/autenticação no futuro
}));
app.use(express.json());

// Configurar o transportador de e-mail (pode ser Gmail, Outlook ou outro)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // exemplo: ecobalance@gmail.com
    pass: process.env.EMAIL_PASS // senha ou App Password
  }
});

cron.schedule('*/15 * * * *', async () => {
  // cron.schedule('0 8 1 * *', async () => {
  console.log('📨 Enviando lembretes mensais...');
  try {
    const usuarios = await User.find({ receberLembretes: true });

    for (const usuario of usuarios) {
      const isPt = usuario.idioma === 'pt';

      const subject = isPt
        ? '🌱 Lembrete mensal: Calcule sua pegada de carbono!'
        : '🌱 Monthly Reminder: Calculate your carbon footprint!';

      const htmlContent = isPt
        ? `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #2D462E; padding: 20px; text-align: center;">
      <img src="https://i.imgur.com/RqNjLcX.png" alt="EcoBalance Logo" style="max-width: 150px; margin-bottom: 10px;" />
    </div>
    <div style="padding: 30px; color: #333;">
      <h3 style="color: #2D462E;">Calcule sua pegada do último mês.</h3>
      <p>Olá, ${usuario.nome}!</p>
      <p>É hora de fazer um novo teste de pegada de carbono e acompanhar seu impacto ambiental.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:3000/teste-logado" style="background-color: #73CC3D; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Calcular
        </a>
      </div>
      <p>Juntos por um planeta mais sustentável! 🌎</p>
      <p>Atenciosamente,<br>A equipe EcoBalance 🌱</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      © 2025 EcoBalance. Todos os direitos reservados.
    </div>
  </div>
  `
        : `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #2D462E; padding: 20px; text-align: center;">
      <img src="https://i.imgur.com/RqNjLcX.png" alt="EcoBalance Logo" style="max-width: 150px; margin-bottom: 10px;" />
    </div>
    <div style="padding: 30px; color: #333;">
      <h3 style="color: #2D462E;">Calculate your footprint from last month.</h3>
      <p>Hello, ${usuario.nome}!</p>
      <p>It's time to take a new carbon footprint test and monitor your environmental impact.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:3000/teste-logado" style="background-color: #73CC3D; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Calculate
        </a>
      </div>
      <p>Together for a more sustainable planet! 🌎</p>
      <p>Sincerely,<br>The EcoBalance team 🌱</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      © 2025 EcoBalance. All rights reserved.
    </div>
  </div>`;

      const mailOptions = {
        from: '"EcoBalance" <ecobalance.app@gmail.com>',
        to: usuario.email,
        subject,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Lembrete enviado para ${usuario.email}`);
    }

  } catch (err) {
    console.error('Erro ao enviar lembretes mensais:', err);
  }
});

app.use('/api/recuperar-senha', recuperarSenhaRouter);
app.use('/api/nova-senha', novaSenhaRouter);

// API de exemplo
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server and MongoDB!" });
});

// Rota de cadastro
app.post("/api/register", async (req, res) => {
  const { nome, email, senha, receberLembretes, conquistas: conquistasRecebidas, idioma } = req.body;

  const conquistasIniciais = [
    {
      nome: "primeiro_teste",
      descricao: "Você concluiu o seu primeiro teste de cálculo de pegada de carbono!",
      ativa: false,
      data: null
    },
    {
      nome: 'abaixo_media_mensal',
      descricao: "Você realizou um teste com emissão abaixo da média global por um mês.",
      ativa: false,
      data: null
    },
    {
      nome: 'abaixo_media_mensal_2',
      descricao: "Você realizou um teste com emissão abaixo da média global por dois meses consecutivos!",
      ativa: false,
      data: null
    },
    {
      nome: "reducao_individual",
      descricao: "Você diminuiu a sua pegada de carbono em relação ao seu último teste!",
      ativa: false,
      data: null
    },
    {
      nome: 'reducao_individual_2',
      descricao: "Você diminuiu sua pegada de carbono consecutivamente por dois testes!",
      ativa: false,
      data: null
    },
  ];

  // 🔄 Atualiza as conquistas iniciais com base nas que vieram do frontend
  if (conquistasRecebidas && Array.isArray(conquistasRecebidas)) {
    conquistasRecebidas.forEach(nomeRecebido => {
      const conquista = conquistasIniciais.find(c => c.nome === nomeRecebido);
      if (conquista) {
        conquista.ativa = true;
        conquista.data = new Date(); // você pode usar null se não quiser registrar a data
      }
    });
  }

  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);

    // 🎲 Gera um número aleatório de 1 a 9 para o avatar
    const avatarSelecionado = Math.floor(Math.random() * 9) + 1;

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      receberLembretes: receberLembretes || false,
      avatarSelecionado,
      conquistas: conquistasIniciais,
      idioma: idioma || 'pt' // fallback para português
    });

    await novoUsuario.save();

    // Retornar dados úteis do usuário para o frontend
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      _id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      receberLembretes: novoUsuario.receberLembretes,
      avatarSelecionado: novoUsuario.avatarSelecionado,
      conquistas: novoUsuario.conquistas,
      idioma: novoUsuario.idioma
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

    res.status(200).json({ message: "Login realizado com sucesso!", _id: usuario._id, nome: usuario.nome, email: usuario.email, receberLembretes: usuario.receberLembretes, avatarSelecionado: usuario.avatarSelecionado, conquistas: usuario.conquistas });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor ao tentar login" });
  }
});

// Rota para atualizar as informações do usuário
app.put("/api/usuarios/:id", async (req, res) => {
  const { nome, email, senha, senhaAntiga, receberLembretes, idioma } = req.body;
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
    if (typeof req.body.avatarSelecionado === 'number') {
      usuario.avatarSelecionado = req.body.avatarSelecionado;
    }
    if (idioma) {
      usuario.idioma = idioma; // ✅ Atualiza o idioma aqui
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

// Atualizar conquistas do usuário
app.put("/api/usuarios/:id/conquistas", async (req, res) => {
  const { conquistas } = req.body; // Ex: ["primeiro_teste", "reducao_individual"]

  if (!Array.isArray(conquistas) || conquistas.length === 0) {
    return res.status(400).json({ error: "Lista de conquistas inválida ou vazia." });
  }

  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    let conquistasAtualizadas = false;

    conquistas.forEach(nomeConquista => {
      const conquista = usuario.conquistas.find(c => c.nome === nomeConquista);
      if (conquista && !conquista.ativa) {
        conquista.ativa = true;
        conquista.data = new Date();
        conquistasAtualizadas = true;
      }
    });

    if (conquistasAtualizadas) {
      await usuario.save();
    }

    res.status(200).json({
      message: conquistasAtualizadas
        ? "Conquistas atualizadas com sucesso."
        : "Nenhuma conquista foi modificada.",
      conquistas: usuario.conquistas
    });
  } catch (err) {
    console.error("Erro ao atualizar conquistas:", err);
    res.status(500).json({ error: "Erro ao atualizar conquistas do usuário." });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});