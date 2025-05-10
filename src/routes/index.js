const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Bem vindo ao PizzaLab" });
});

router.post("/entrar", (_, res) => {
  res.json({ message: "Usuário logado com sucesso" });
});

module.exports = router;
