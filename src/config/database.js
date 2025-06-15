const dotenv = require("dotenv");

// Carrega as variáveis de ambiente
const envResult = dotenv.config();

if (envResult.error) {
  throw new Error("⚠️ Arquivo .env não encontrado");
}

// Valida e obtém a URL do banco de dados
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE;

  if (!dbUrl) {
    throw new Error("⚠️ Variável de ambiente DATABASE não está definida");
  }

  // Valida se a URL está no formato correto do MongoDB
  if (!dbUrl.startsWith("mongodb://") && !dbUrl.startsWith("mongodb+srv://")) {
    throw new Error(
      "⚠️ URL do banco de dados inválida. Deve começar com mongodb:// ou mongodb+srv://"
    );
  }

  return dbUrl;
};

module.exports = {
  url: getDatabaseUrl(),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
