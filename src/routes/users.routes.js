const express = require("express");
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/users.controller");
const { autenticarJWT } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todos os clientes
 *     description: Retorna uma lista de todos os clientes cadastrados.
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *       401:
 *         description: Não autorizado - Token inválido ou expirado
 *   post:
 *     tags: [Usuários]
 *     summary: Cadastrar um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *
 * /user/{id}:
 *   get:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar um cliente específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar um cliente
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
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *   delete:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar um cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 */

router.get("/", autenticarJWT, getAllClients);

router.get("/:id", autenticarJWT, getClientById);

router.post("/", createClient);

router.put("/:id", autenticarJWT, updateClient);

router.delete("/:id", autenticarJWT, deleteClient);

module.exports = usersRoutes = router;
