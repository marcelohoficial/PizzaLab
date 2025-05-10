const Order = require("../models/orders");

const getAllOrders = async (_, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(200).json({ error: "Nenhum pedido encontrado" });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar os pedidos" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items")
      .populate("client_id");

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar o pedido" });
  }
};

const createOrder = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { client_id, items } = req.body;

    if (!client_id) {
      return res.status(400).json({ error: "Nenhum cliente encontrado" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Nenhum item encontrado" });
    }

    const newOrder = new Order({ client_id, items });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "Erro ao realizar o pedido" });
  }
};

const updateOrder = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const { isPaid, status } = req.body;

    const order = await Order.findById(req.params.id)
      .populate("items")
      .populate("client_id");

    if (order.isPaid && status === "Aguardando pagamento") {
      return res.status(400).json({
        error: "Pedido já pago, não pode voltar para 'Aguardando pagamento'",
      });
    }

    if (!isValidStatusTransition(order.status, status)) {
      return res.status(400).json({ error: "Transição de status inválida." });
    }

    const value = order.items.reduce((total, item) => {
      const pizza = order.items.find((p) => p._id.toString() === item.pizzaId);
      return pizza ? total + pizza.price * item.quantity : total;
    }, 0);
    const { items } = order;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { isPaid, status, value, items },
      { new: true, runValidators: true }
    )
      .populate("items")
      .populate("client_id");

    if (!updatedOrder) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.log("erro " + err.message);
    res.status(400).json({ error: "Erro ao atualizar o pedido" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json({ message: "Pedido deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar o pedido" });
  }
};

/**
 * Valida a transição de status de uma ordem
 * @param {string} currentStatus - Status atual da ordem no banco (MongoDB)
 * @param {string} newStatus - Novo status recebido no body da requisição
 * @returns {boolean} true se a transição é válida, false caso contrário
 */
function isValidStatusTransition(currentStatus, newStatus) {
  const statusOptions = [
    "Aguardando pagamento",
    "Preparando pedido",
    "Seu pedido está a caminho",
    "Pedido entregue",
  ];

  const currentIndex = statusOptions.indexOf(currentStatus);
  const newIndex = statusOptions.indexOf(newStatus);

  // Verifica se os status existem na lista
  if (currentIndex === -1 || newIndex === -1) {
    return false;
  }

  // Só permite ir para o próximo status da sequência
  return newIndex === currentIndex + 1;
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
