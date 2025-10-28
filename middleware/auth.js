function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error_msg", "Vous devez vous connecter pour accéder à cette page");
  res.redirect("/auth/login");
}

module.exports = ensureAuthenticated;
