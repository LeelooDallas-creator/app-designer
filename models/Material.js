const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Bois", "Fer", "Plastique"], required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
});

module.exports = mongoose.model("Material", materialSchema);