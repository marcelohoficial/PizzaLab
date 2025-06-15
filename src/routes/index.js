const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Bem vindo ao PizzaLab" });
});

module.exports = router;
