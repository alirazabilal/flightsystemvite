import React, { useContext, useEffect } from "react";
import flightContext from "../context/notes/flightContext";
import { useNavigate } from "react-router-dom";

import "./BookOriginal.css";

const BookOriginal = () => {
  const context = useContext(flightContext);
  const { addFlights } = context;
  let navigate = useNavigate();

  const availableFlights = [
    {
      id: 1,
      departure: "New York",
      arrival: "London",
      departureTime: "10:00",
      arrivalTime: "12:00",
      seats: 200,
      aircraft: "a320",
    },
    {
      id: 2,
      departure: "Los Angeles",
      arrival: "Tokyo",
      departureTime: "9:00",
      arrivalTime: "13:00",
      seats: 300,
      aircraft: "b777",
    },
    {
      id: 3,
      departure: "Sydney",
      arrival: "Dubai",
      departureTime: "14:00",
      arrivalTime: "16:00",
      seats: 250,
      aircraft: "a380",
    },
    {
      id: 4,
      departure: "Mumbai",
      arrival: "Singapore",
      departureTime: "16:00",
      arrivalTime: "18:00",
      seats: 180,
      aircraft: "b787",
    },
    {
      id: 5,
      departure: "New York",
      arrival: "London",
      departureTime: "10:00",
      arrivalTime: "12:00",
      seats: 200,
      aircraft: "a320",
    },
    {
      id: 6,
      departure: "Los Angeles",
      arrival: "Tokyo",
      departureTime: "9:00",
      arrivalTime: "13:00",
      seats: 300,
      aircraft: "b777",
    },
    {
      id: 7,
      departure: "Sydney",
      arrival: "Dubai",
      departureTime: "14:00",
      arrivalTime: "16:00",
      seats: 250,
      aircraft: "a380",
    },
    {
      id: 8,
      departure: "Mumbai",
      arrival: "Singapore",
      departureTime: "16:00",
      arrivalTime: "18:00",
      seats: 180,
      aircraft: "b787",
    },
  ];

  const handleBook = (flight) => {
    if (window.confirm("ARE YOU SURE YOU WANT TO BOOK SELECTED FLIGHT ???")) {
      addFlights(
        flight.departure,
        flight.arrival,
        flight.seats,
        flight.aircraft
      );
      alert(
        "FLIGHT BOOKED SUCCESSFULLY !!! THANKS FOR CHOOSING US AS YOUR TRAVEL PARTNER ..."
      );
      navigate("/manage");
    } else {
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container my-3">
      <h2>Available Flights</h2>
      <div className="row">
        {availableFlights.map((flight) => (
          <div className="col-md-4" key={flight.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  {flight.departure} to {flight.arrival}
                </h5>
                <p className="card-text">Seats: {flight.seats}</p>
                <p className="card-text">Aircraft: {flight.aircraft}</p>
                <p className="card-text">
                  DEPARTURE TIME: {flight.departureTime}
                </p>
                <p className="card-text">ARRIVAL TIME: {flight.arrivalTime}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBook(flight)}
                >
                  Book Flight
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookOriginal;
