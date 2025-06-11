// server/models/User.js
const mongoose = require('mongoose');

const ConquistaSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // ex: "abaixo_media_mensal"
  descricao: { type: String, required: true },
  data: { type: Date, default: null },
  ativa: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  receberLembretes: { type: Boolean, default: false },
  avatarSelecionado: { type: Number, default: 1 },
  conquistas: { type: [ConquistaSchema], default: [] },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  idioma: {
  type: String,
  enum: ['pt', 'en'],
  default: 'pt'
  }
});

module.exports = mongoose.model('User', UserSchema);
