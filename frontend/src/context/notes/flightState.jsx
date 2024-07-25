import React, { useState } from "react";
import flightContext from "./flightContext";

const FlightState = (props) => {
  const host = "https://flightsystemvite-backend.onrender.com";
  const flightsInitial = [];

  const [flights, setFlights] = useState(flightsInitial);

  // Get all flights
  const getFlights = async () => {
    const response = await fetch(`${host}/api/flights/fetchallflights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setFlights(json);
  };

  // Add a flight
  const addFlights = async (departure, arrival, seats, aircraft) => {
    const response = await fetch(`${host}/api/flights/addflight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ departure, arrival, seats, aircraft }),
    });
    const flight = await response.json();
    setFlights(flights.concat(flight));
  };

  // Delete a flight
  const deleteFlights = async (id) => {
    const response = await fetch(`${host}/api/flights/deleteflight/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newFlights = flights.filter((flight) => flight._id !== id);
    setFlights(newFlights);
  };

  // Edit a flight
  const editFlights = async (id, departure, arrival, seats, aircraft) => {
    const response = await fetch(`${host}/api/flights/updateflight/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ departure, arrival, seats, aircraft }),
    });
    const json = await response.json();
    console.log(json);

    let newFlights = JSON.parse(JSON.stringify(flights));

    for (let index = 0; index < newFlights.length; index++) {
      const element = newFlights[index];
      if (element._id === id) {
        newFlights[index].departure = departure;
        newFlights[index].arrival = arrival;
        newFlights[index].seats = seats;
        newFlights[index].aircraft = aircraft;
        break;
      }
    }
    setFlights(newFlights);
  };

  return (
    <flightContext.Provider
      value={{ flights, addFlights, deleteFlights, editFlights, getFlights }}
    >
      {props.children}
    </flightContext.Provider>
  );
};

export default FlightState;
