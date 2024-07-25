import React, { useContext, useState, useEffect } from "react";
import flightContext from "../context/notes/flightContext";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const context = useContext(flightContext);
  const { addFlights } = context; // Ensure this matches your context methods
  const [flight, setFlight] = useState({
    departure: "",
    arrival: "",
    seats: "",
    aircraft: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addFlights(flight.departure, flight.arrival, flight.seats, flight.aircraft);
    setFlight({ departure: "", arrival: "", seats: "", aircraft: "" });
    alert(
      "FLIGHT BOOKED SUCCESSFULY !!! THANKS FOR CHOOSING US AS YOUR TRAVEL PARTNER ..."
    );
  };

  const onChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container my-3">
      <h2>Add a Flight</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="departure" className="form-label">
            Departure
          </label>
          <input
            type="text"
            className="form-control"
            id="departure"
            value={flight.departure}
            name="departure"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival" className="form-label">
            Arrival
          </label>
          <input
            type="text"
            className="form-control"
            id="arrival"
            value={flight.arrival}
            name="arrival"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="seats" className="form-label">
            Seats
          </label>
          <input
            type="number"
            className="form-control"
            id="seats"
            value={flight.seats}
            name="seats"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="aircraft" className="form-label">
            Aircraft (KINDLY CHOOSE BETWEEN "a320", "a321", "b777", "b747",
            "b787", "a330", "a340", "a350", "a380", "b788", "b789", )
            <br />
            OTHERWISE YOUR FLIGHT WILL NOT BE BOOKED
          </label>
          <input
            type="text"
            className="form-control"
            id="aircraft"
            value={flight.aircraft}
            name="aircraft"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button
          disabled={flight.aircraft.length < 4 || flight.aircraft.length > 4}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default Book;
