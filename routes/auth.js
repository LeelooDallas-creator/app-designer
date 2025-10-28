const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/login", (req, res) => {
  res.render("login", { error_msg: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "Vous êtes déconnecté");
    res.redirect("/auth/login");
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, passwordHash });
    req.flash("success_msg", "Compte créé avec succès");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", "Erreur lors de la création du compte");
    res.redirect("/auth/register");
  }
});

module.exports = router;
