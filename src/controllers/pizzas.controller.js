const Pizza = require("../models/pizzas");

const getAllPizzas = async (_, res) => {
  try {
    const pizzas = await Pizza.find();

    if (!pizzas || pizzas.length === 0) {
      return res.status(200).json({ error: "Nenhuma pizza encontrada" });
    }

    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar as pizzas" });
  }
};

const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ error: "Pizza não encontrada" });
    }
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar a pizza" });
  }
};

const createPizza = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { name, price } = req.body;

    const newPizza = new Pizza({ name, price });

    await newPizza.save();

    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar a pizza" });
  }
};

const updatePizza = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { name, price } = req.body;
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!updatedPizza) {
      return res.status(404).json({ error: "Pizza não encontrada" });
    }

    res.json(updatedPizza);
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar a pizza" });
  }
};

const deletePizza = async (req, res) => {
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ error: "Pizza não encontrada" });
    }
    res.json({ message: "Pizza deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar a pizza" });
  }
};

module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};
