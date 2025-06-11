require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 Conectado ao MongoDB Atlas');
  } catch (err) {
    console.error('🔴 Erro ao conectar ao MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;