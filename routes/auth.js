const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models/user");

const router = express.Router();
mongoose.set("strictQuery", false);

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password.");

  const token = user.genrateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(req);
}

module.exports = router;
