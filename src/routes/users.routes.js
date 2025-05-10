const express = require("express");
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/users.controller");
const router = express.Router();

// Listar todos os clientes
router.get("/", getAllClients);

// Mostrar um cliente específico
router.get("/:id", getClientById);

// Criar um novo cliente
router.post("/", createClient);

// Atualizar um cliente existente
router.put("/:id", updateClient);

// Deletar um cliente
router.delete("/:id", deleteClient);

module.exports = usersRoutes = router;
