const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Furniture", furnitureSchema);
