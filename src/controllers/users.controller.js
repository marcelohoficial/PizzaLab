const Client = require("../models/clients");

const getAllClients = async (_, res) => {
  try {
    const clients = await Client.find();

    if (!clients || clients.length === 0) {
      return res.status(200).json({ error: "Nenhum cliente encontrado" });
    }

    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar os clientes" });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar o cliente" });
  }
};

const createClient = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { name, phone } = req.body;

    const existingClient = await Client.findOne({ phone });
    if (existingClient) {
      return res.status(400).json({ error: "Cliente já existe" });
    }

    const valid = validationUser({ name, phone });
    if (valid.error) {
      return res.status(400).json({ error: valid.error });
    }

    const newClient = new Client({ name, phone });

    await newClient.save();

    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar o cliente" });
  }
};

const updateClient = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { name, phone } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    const valid = validationUser({ name, phone });
    if (valid.error) {
      return res.status(400).json({ error: valid.error });
    }

    res.json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erro ao atualizar o cliente" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o cliente" });
  }
};

function validationUser({ name, phone }) {
  if (!name || name.length < 3) {
    return { error: "Você deve informar um nome válido" };
  }

  if (!/^\d{10,11}$/.test(phone)) {
    return { error: "Você deve informar um telefone válido" };
  }

  return false;
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
