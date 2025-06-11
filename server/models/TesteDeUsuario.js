const mongoose = require('mongoose');

const testeDeUsuarioSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  rotina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rotina',
    required: true
  },
  dataRealizacao: {
    type: Date,
    default: Date.now
  },
  energiaEletrica: {
    kwh: { type: Number, required: true },
    emissao: { type: Number, required: true } // kwh * fator
  },
  gasNatural: {
    m3: { type: Number }, // apenas se tipoGas === 'encanado'
    emissao: { type: Number }
  },
  viagem: {
    fezViagem: { type: Boolean, required: true },
    internacional: { type: Boolean }, // se fezViagem = true
    veiculos: [
      {
        tipo: { type: String, enum: ['Carro', 'Carro elétrico', 'Moto', 'Ônibus', 'Metrô', 'Trem', 'Avião', 'Barco/cruzeiro', 'Car', 'Electric car', 'Motorcycle', 'Bus', 'Subway', 'Train', 'Airplane', 'Boat/Cruise'] },
        km: { type: Number },
        emissao: { type: Number } // km * fator do veículo
      }
    ]
  },
  emissaoAlimentos: {
    type: Number,
    required: true
  },
  emissaoGas: {
    type: Number
  },
  emissaoVeiculos: {
    type: Number
  },
  emissaoTotal: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('TesteDeUsuario', testeDeUsuarioSchema);