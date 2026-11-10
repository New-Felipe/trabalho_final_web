const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    categoria: {
      type: String,
      required: true,
      enum: [
        "Processadores",
        "Placas de Vídeo",
        "Placas-mãe",
        "Memória RAM",
        "Armazenamento",
        "Fontes de Alimentação"
      ]
    },

    marca: {
      type: String,
      required: true,
      trim: true
    },

    preco: {
      type: Number,
      required: true,
      min: 0
    },

    descricao: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Component', componentSchema);