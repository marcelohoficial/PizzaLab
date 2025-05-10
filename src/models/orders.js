const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
      minQuantity: 1,
    },
  ],
  value: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: [
      "Aguardando pagamento",
      "Preparando pedido",
      "Seu pedido está a caminho",
      "Pedido entregue",
    ],
    default: "Aguardando pagamento",
  },
});

const Orders = mongoose.model("Order", OrdersSchema);

module.exports = Orders;
