const mongoose = require("mongoose");
const express = require("express");

const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const logger = require("../logger");

const router = express.Router();
mongoose.set("strictQuery", false);

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send({ msg: "genre with id wasn't found." });
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.status(200).send(genre);
});
// [auth],

router.put("/:id", async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre with given wasn't found");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  genre = await genre.save();

  res.send(genre);
});
// [auth, admin],
router.delete("/:id", async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with given wasn't found");
  res.send(genre);
});

module.exports = router;
