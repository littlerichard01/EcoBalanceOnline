// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  receberLembretes: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);
