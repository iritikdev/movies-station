const express = require("express");
const cors = require("cors");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("X-powered-by", "Blood, sweat, and tears.");
    next();
  });
  app.use(express.json());
  app.use(cors());
  app.use(express.static("public"));
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
};
