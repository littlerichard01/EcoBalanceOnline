const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/nova', async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    const usuario = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!usuario) return res.status(400).json({ error: "Token inválido ou expirado" });

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    usuario.senha = senhaCriptografada;
    usuario.resetToken = undefined;
    usuario.resetTokenExpiration = undefined;

    await usuario.save();

    res.status(200).json({ message: "Senha atualizada com sucesso!" });

  } catch (error) {
    res.status(500).json({ error: "Erro interno ao redefinir senha" });
  }
});

module.exports = router;