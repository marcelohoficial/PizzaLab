const express = require("express");
const {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzas.controller");
const router = express.Router();

// Listar todas as pizzas
router.get("/", getAllPizzas);

// Mostrar uma pizza específica
router.get("/:id", getPizzaById);

// Criar uma nova pizza
router.post("/", createPizza);

// Atualizar uma pizza existente
router.put("/:id", updatePizza);

// Deletar uma pizza
router.delete("/:id", deletePizza);

module.exports = pizzasRoutes = router;
