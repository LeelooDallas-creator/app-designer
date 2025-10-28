const express = require("express");
const router = express.Router();
const Furniture = require("../models/Furniture");
const Category = require("../models/Category");
const Material = require("../models/Material");
const ensureAuthenticated = require("../middleware/auth");

// Liste des meubles
router.get("/", ensureAuthenticated, async (req, res) => {
  const furnitures = await Furniture.find()
    .populate("category")
    .populate("materials");
  res.render("furnitures/list", { furnitures });
});

// Formulaire de création
router.get("/create", ensureAuthenticated, async (req, res) => {
  const categories = await Category.find();
  const materials = await Material.find();
  res.render("furnitures/create", { categories, materials });
});

// Création
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { name, category, materials } = req.body;
  await Furniture.create({ name, category, materials });
  req.flash("success_msg", "Meuble créé avec succès");
  res.redirect("/furnitures");
});

// Formulaire d'édition
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);
  const categories = await Category.find();
  const materials = await Material.find();
  res.render("furnitures/edit", { furniture, categories, materials });
});

// Edition
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  const { name, category, materials } = req.body;
  await Furniture.findByIdAndUpdate(req.params.id, { name, category, materials });
  req.flash("success_msg", "Meuble mis à jour");
  res.redirect("/furnitures");
});

// Supprimer
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await Furniture.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Meuble supprimé");
  res.redirect("/furnitures");
});

module.exports = router;
