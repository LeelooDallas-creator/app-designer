const express = require("express");
const router = express.Router();
const Material = require("../models/Material");
const Supplier = require("../models/Supplier");
const ensureAuthenticated = require("../middleware/auth");

// Liste des matériaux
router.get("/", ensureAuthenticated, async (req, res) => {
  const materials = await Material.find().populate("supplier");
  res.render("materials/list", { materials });
});

// Formulaire de création
router.get("/create", ensureAuthenticated, async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("materials/create", { suppliers });
});

// Création
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { name, type, supplier } = req.body;
  await Material.create({ name, type, supplier });
  req.flash("success_msg", "Matériau créé avec succès");
  res.redirect("/materials");
});

// Formulaire d'édition
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  const material = await Material.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render("materials/edit", { material, suppliers });
});

// Edition
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  const { name, type, supplier } = req.body;
  await Material.findByIdAndUpdate(req.params.id, { name, type, supplier });
  req.flash("success_msg", "Matériau mis à jour");
  res.redirect("/materials");
});

// Supprimer
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await Material.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Matériau supprimé");
  res.redirect("/materials");
});

module.exports = router;
