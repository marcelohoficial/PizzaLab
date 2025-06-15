const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredoJWT";

function gerarToken(user) {
  const { _id, name, phone, type, address } = user;
  return jwt.sign(
    { id: _id, nome: name, telefone: phone, acesso: type, endereco: address },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

function autenticarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    req.user = user;
    next();
  });
}

module.exports = { gerarToken, autenticarJWT };
