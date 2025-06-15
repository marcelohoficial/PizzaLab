const mongoose = require("mongoose");
const { url } = require("../config/database");

const URI = process.env.DATABASE || "";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
};

module.exports = connectToDatabase;
