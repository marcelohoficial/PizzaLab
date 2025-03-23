const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Bem vindo a PizzaLab" });
});

router.get("/pizzas", (_, res) => {
  res.json([
    { id: 1, name: "Calabresa", price: 30.0 },
    { id: 2, name: "Mussarela", price: 30.0 },
    { id: 3, name: "Portuguesa", price: 35.0 },
    { id: 4, name: "Frango com Catupiry", price: 35.0 },
    { id: 5, name: "Marguerita", price: 35.0 },
    { id: 6, name: "Quatro Queijos", price: 35.0 },
  ]);
});

router.post("/entrar", (_, res) => {
  res.json({ message: "Usuário logado com sucesso" });
});

router.post("/cadastrar", (_, res) => {
  res.json({ message: "Usuário cadastrado com sucesso" });
});

module.exports = router;
