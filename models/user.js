const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlegth: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlegth: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlegth: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;
