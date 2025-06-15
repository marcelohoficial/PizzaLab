const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const { autenticarJWT } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todos os pedidos
 *     description: Retorna uma lista de todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Não autorizado
 *
 *   post:
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     summary: Criar um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pizzaId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       401:
 *         description: Não autorizado
 *
 * /orders/{id}:
 *   get:
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar um pedido específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 *
 *   put:
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, preparing, delivering, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 *
 *   delete:
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */

router.get("/", autenticarJWT, getAllOrders);
router.get("/:id", autenticarJWT, getOrderById);
router.post("/", autenticarJWT, createOrder);
router.put("/:id", autenticarJWT, updateOrder);
router.delete("/:id", autenticarJWT, deleteOrder);

module.exports = ordersRoutes = router;
