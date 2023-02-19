const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 16,
    },
    isGold: {
      type: Boolean,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).label("Name"),
    phone: Joi.string().required().label("Phone"),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(customer, { abortEarly: false });
}

exports.Customer = Customer;
exports.validate = validateCustomer;
