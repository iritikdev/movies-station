const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlegth: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
  });
  return schema.validate(genre, { abortEarly: false });
}

exports.validate = validateGenres;
exports.Genre = Genre;
exports.genreSchema = genreSchema;
