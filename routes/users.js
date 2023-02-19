const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();
mongoose.set("strictQuery", false);

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

/** http://localhost:8000/api/auth
 *  @Add User return x-auth-token with header & return created user
 *  @body : {
 *    name : "Ritik",
 *    email : "user1@gmai.com",
 *    password : "12345"
 * }
 */

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  const token = user.genrateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
