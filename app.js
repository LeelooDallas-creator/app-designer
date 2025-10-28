require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/meubles_app";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const supplierRoutes = require("./routes/suppliers");
app.use("/suppliers", supplierRoutes);

const materialRoutes = require("./routes/materials");
app.use("/materials", materialRoutes);

const categoryRoutes = require("./routes/categories");
app.use("/categories", categoryRoutes);

const furnitureRoutes = require("./routes/furnitures");
app.use("/furnitures", furnitureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
);
