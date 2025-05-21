const mongoose = require('mongoose');

const rotinaSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nome: { type: String, required: true },
    dieta: { type: String },
    porcoes: {
        type: Map,
        of: Number
    },
    quantidadePessoas: { type: Number },
    tipoGas: { type: String }, // "encanado" ou "botijao"
    tipoBotijao: { type: String }, // "P13", "P20", "P45"
    tempoDuracaoGas: { type: Number },
    usaVeiculo: { type: String }, // "sim" ou "nao"
    possuiVeiculo: { type: String }, // "proprio" ou "publico"
    combustivel: { type: String }, // "Gasolina", "Diesel", "Etanol", "Elétrico", "Nenhum"
    litrosCombustivel: { type: Number },
    kmEletrico: { type: Number },
    transportesPublicos: [String],
    kmTransportes: {
        type: Map,
        of: Number
    },
    emissoes: {
        alimentos: Number,
        gas: Number, // null se for gás encanado
        veiculos: Number
    },
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rotina', rotinaSchema);