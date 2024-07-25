const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Flights = require("../models/flights");

var fetching = require("../middlewares/fetching");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "aliisagoodb#oy";

router.get("/fetchallflights", fetching, async (req, res) => {
  try {
    const flights = await Flights.find({ user: req.user.id });
    res.json(flights);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("INTERNAL ISSUES");
  }
});
router.post(
  "/addflight",
  fetching,
  [
    body("departure", "enter a departure airport").isLength({ min: 3 }),
    body("arrival", "enter a arrival airport").isLength({ min: 3 }),
    body("seats", "enter a valid seats numbers").isLength({ min: 1 }),
    body(
      "aircraft",
      "enter a valid boeing/airbus in small letters like a330 , b777 ...."
    ).isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const { departure, arrival, seats, aircraft } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      const flight = new Flights({
        departure,
        arrival,
        seats,
        aircraft,
        user: req.user.id,
      });
      const data = {
        user: {
          id: flight.id,
        },
      };
      const saving = await flight.save();
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/updateflight/:id", fetching, async (req, res) => {
  const { departure, arrival, seats, aircraft } = req.body;

  try {
    const newFlight = {};
    if (departure) {
      newFlight.departure = departure;
    }
    if (arrival) {
      newFlight.arrival = arrival;
    }
    if (seats) {
      newFlight.seats = seats;
    }
    if (aircraft) {
      newFlight.aircraft = aircraft;
    }

    let flight = await Flights.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }

    if (flight.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    flight = await Flights.findByIdAndUpdate(
      req.params.id,
      { $set: newFlight },
      { new: true }
    );
    res.json({ flight });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("INTERNAL ISSUES");
  }
});

router.delete("/deleteflight/:id", fetching, async (req, res) => {
  try {
    let flight = await Flights.findById(req.params.id);
    if (!flight) {
      return res.status(404).send("Not Found");
    }

    if (flight.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    flight = await Flights.findByIdAndDelete(req.params.id);

    res.json({ Success: "flight has been finally deleted", flight: flight });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal issue");
  }
});
module.exports = router;
