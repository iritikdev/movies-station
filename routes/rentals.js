const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(400).send("Invalid rental");
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res
      .status(400)
      .send({ message: "Rental with given id was not found." });
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send({ message: "Invalid customer" });

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send({ message: "Invalid movie" });

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      rental = await rental.save();
      movie.numberInStock--;
      movie.save();
      res.send(rental);
    });
    session.endSession();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
