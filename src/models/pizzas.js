const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;
