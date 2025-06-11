const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.post('/solicitar', async (req, res) => {
  const { email, idioma } = req.body;

  const textos = {
    pt: {
      titulo: "Redefinição de Senha",
      saudacao: "Olá,",
      instrucoes: "Recebemos uma solicitação para redefinir sua senha no EcoBalance.",
      cliqueBotao: "Para criar uma nova senha, clique no botão abaixo:",
      ignorar: "Se você não solicitou isso, pode ignorar este e-mail. O link expirará em 1 hora por segurança.",
      assinatura: "Atenciosamente,<br>A equipe EcoBalance 🌱",
      botao: "Redefinir Senha",
    },
    en: {
      titulo: "Password Reset",
      saudacao: "Hello,",
      instrucoes: "We received a request to reset your EcoBalance password.",
      cliqueBotao: "To create a new password, click the button below:",
      ignorar: "If you did not request this, please ignore this email. The link will expire in 1 hour for security.",
      assinatura: "Sincerely,<br>The EcoBalance Team 🌱",
      botao: "Reset Password",
    },
  };

  // Dentro da rota /solicitar
  const mensagens = {
    pt: {
      emailEnviado: "E-mail de redefinição enviado com sucesso!",
      usuarioNaoEncontrado: "Usuário não encontrado",
      erroInterno: "Erro interno no servidor",
    },
    en: {
      emailEnviado: "Password reset email sent successfully!",
      usuarioNaoEncontrado: "User not found",
      erroInterno: "Internal server error",
    }
  };

  try {
    const t = textos[idioma] || textos.pt; // fallback para pt
    const m = mensagens[idioma] || mensagens.pt;

    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ error: m.usuarioNaoEncontrado });

    const token = crypto.randomBytes(32).toString('hex');
    usuario.resetToken = token;
    usuario.resetTokenExpiration = Date.now() + 3600000; // 1h
    await usuario.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const link = `http://localhost:3000/nova-senha?token=${token}`;
    // const link = `http://ecobalance-backend.onrender.com/nova-senha?token=${token}`;


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: "Redefinição de senha - EcoBalance",
      html: `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #2D462E; padding: 20px; text-align: center;">
      <img src="https://i.imgur.com/RqNjLcX.png" alt="EcoBalance Logo" style="max-width: 150px; margin-bottom: 10px;" />
    </div>
    <div style="padding: 30px; color: #333;">
      <h3 style="color: #2D462E;">${t.titulo}</h3>
      <p>${t.saudacao}</p>
      <p>${t.instrucoes}</p>
      <p>${t.cliqueBotao}</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #73CC3D; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          ${t.botao}
        </a>
      </div>
      <p>${t.ignorar}</p>
      <p>${t.assinatura}</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      © 2025 EcoBalance. Todos os direitos reservados.
    </div>
  </div>
`,
    });

    res.status(200).json({ message: m.emailEnviado });

  } catch (error) {
    res.status(500).json({ error: m.erroInterno });
  }
});

module.exports = router;