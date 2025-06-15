const express = require("express");
const {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzas.controller");
const { autenticarJWT } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * /pizza:
 *   get:
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todas as pizzas
 *     description: Retorna uma lista de todas as pizzas disponíveis
 *     responses:
 *       200:
 *         description: Lista de pizzas retornada com sucesso
 *       401:
 *         description: Não autorizado
 *
 *   post:
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     summary: Criar uma nova pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pizza criada com sucesso
 *       401:
 *         description: Não autorizado
 *
 * /pizza/{id}:
 *   get:
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar uma pizza específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza encontrada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pizza não encontrada
 *
 *   put:
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar uma pizza
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pizza atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pizza não encontrada
 *
 *   delete:
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar uma pizza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pizza não encontrada
 */

router.get("/", autenticarJWT, getAllPizzas);
router.get("/:id", autenticarJWT, getPizzaById);
router.post("/", autenticarJWT, createPizza);
router.put("/:id", autenticarJWT, updatePizza);
router.delete("/:id", autenticarJWT, deletePizza);

module.exports = pizzasRoutes = router;
