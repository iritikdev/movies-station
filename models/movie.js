const mongoose = require("mongoose");
const Joi = require("joi");

const { genreSchema } = require("./genre");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    trim: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});
const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required().label("Title"),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required().label("Stock"),
    dailyRentalRate: Joi.number().min(0).max(255).required().label("Rate"),
  });
  return schema.validate(movie, { abortEarly: false });
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
