const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Accueil", message: "Bienvenue dans l'application du designer !" });
});

module.exports = router;
