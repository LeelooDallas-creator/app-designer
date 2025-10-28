const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");
const ensureAuthenticated = require("../middleware/auth");

// Liste des fournisseurs
router.get("/", ensureAuthenticated, async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/list", { suppliers });
});

// Formulaire de création
router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("suppliers/create");
});

// Création
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await Supplier.create({ name });
  req.flash("success_msg", "Fournisseur créé avec succès");
  res.redirect("/suppliers");
});

// Formulaire d'édition
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("suppliers/edit", { supplier });
});

// Edition
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name });
  req.flash("success_msg", "Fournisseur mis à jour");
  res.redirect("/suppliers");
});

// Supprimer
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Fournisseur supprimé");
  res.redirect("/suppliers");
});

module.exports = router;
