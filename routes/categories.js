const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const ensureAuthenticated = require("../middleware/auth");

// Liste des catégories
router.get("/", ensureAuthenticated, async (req, res) => {
  const categories = await Category.find();
  res.render("categories/list", { categories });
});

// Formulaire de création
router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("categories/create");
});

// Création
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await Category.create({ name });
  req.flash("success_msg", "Catégorie créée avec succès");
  res.redirect("/categories");
});

// Formulaire d'édition
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("categories/edit", { category });
});

// Edition
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  await Category.findByIdAndUpdate(req.params.id, { name });
  req.flash("success_msg", "Catégorie mise à jour");
  res.redirect("/categories");
});

// Supprimer
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Catégorie supprimée");
  res.redirect("/categories");
});

module.exports = router;
