const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const router = express.Router();

// Listar todos os pedidos
router.get("/", getAllOrders);

// Mostrar um pedido específico
router.get("/:id", getOrderById);

// Criar um novo pedido
router.post("/", createOrder);

// Atualizar um pedido existente
router.put("/:id", updateOrder);

// Deletar um pedido
router.delete("/:id", deleteOrder);

module.exports = ordersRoutes = router;
