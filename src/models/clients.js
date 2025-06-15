const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
    handle: function (v) {
      return crypto
        .createHash("sha256", process.env.JWT_SECRET)
        .update(password)
        .digest("hex");
    },
  },
  address: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Cliente", "Administrador"],
    default: "Cliente",
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
