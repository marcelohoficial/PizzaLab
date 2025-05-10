const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://marcelo12musico:MCv9UTXS6CVODmc0@cluster0-pizzalab.x6divvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-pizzalab",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
};

module.exports = connectToDatabase;
