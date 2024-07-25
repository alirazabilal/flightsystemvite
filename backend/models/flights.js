const mongoose = require("mongoose");

const { Schema } = mongoose;

const FlightsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  aircraft: {
    type: String,
    required: true,
    enum: [
      "a320",
      "a321",
      "b777",
      "b747",
      "b787",
      "a330",
      "a340",
      "a350",
      "a380",
      "b788",
      "b789",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Flights = mongoose.model("flights", FlightsSchema);
module.exports = Flights;
