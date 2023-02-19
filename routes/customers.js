const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");

const router = express.Router();
mongoose.set("strictQuery", false);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(404).send({ message: "Customer with given id not found." });
  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    const errors = [];
    for (let item in ex.errors) {
      errors.push(ex.errors[item].message);
    }
    res.send(errors);
  }
});

router.put("/:id", auth, async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(404).send({ message: "Customer with given id not found." });

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  customer.name = req.body.name;
  customer.phone = req.body.phone;
  customer.isGold = req.body.isGold;
  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    const errors = [];
    for (let item in ex.errors) {
      errors.push(ex.errors[item].message);
    }
    res.send(errors);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.send(404).send({ message: "Customer with given id not found." });
  res.send(customer);
});

module.exports = router;
