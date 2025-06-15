const express = require("express");
const Client = require("../models/clients");
const { gerarToken, autenticarJWT } = require("../middlewares/auth");
const { createClient } = require("../controllers/users.controller");
const crypto = require("crypto");

const router = express.Router();

/**
 * @swagger
 * /auth/:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza o login do usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 * /auth/register/admin/:
 *   post:
 *     tags: [Autenticação]
 *     summary: Cadastrar um novo Admin
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
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       201:
 *         description: Admin criado com sucesso
 *       400:
 *         description: Preencha todos os campos obrigatórios
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao criar o Admin
 */
router.post("/", async (req, res) => {
  const { phone, password } = req.body;

  const user = await Client.findOne({
    phone,
  });

  if (user) {
    const pass = crypto
      .createHash("sha256", process.env.JWT_SECRET)
      .update(password)
      .digest("hex");

    if (user.password === pass) {
      const token = gerarToken(user);

      return res.json({
        token,
        user: { id: user.id },
        message: "Login realizado com sucesso!",
      });
    }
  }

  return res.status(401).json({ message: "Credenciais inválidas." });
});

router.post("/register/admin", autenticarJWT, async (req, res) => {
  try {
    const { name, phone, password, address } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existingClient = await Client.findOne({ phone });
    if (existingClient) {
      await Client.findByIdAndUpdate(existingClient._id, {
        name,
        password: await crypto
          .createHash("sha256", process.env.JWT_SECRET)
          .update(password)
          .digest("hex"),
        address,
        type: "Administrador",
      });

      return res.status(200).json({ message: "Admin atualizado" });
    }

    const newClient = new Client({
      name,
      phone,
      password: crypto
        .createHash("sha256", process.env.JWT_SECRET)
        .update(password)
        .digest("hex"),
      address,
      type: "Administrador",
    });

    await newClient.save();

    return res.status(201).json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar o admin" });
  }
});

module.exports = router;
