import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import flightContext from "../context/notes/flightContext";
import { useNavigate } from "react-router-dom";

const Manage = () => {
  const context = useContext(flightContext);
  const { getFlights, flights, editFlights, deleteFlights } = context;

  const [showModal, setShowModal] = useState(false);
  const [currentFlight, setCurrentFlight] = useState({
    id: "",
    departure: "",
    arrival: "",
    seats: "",
    aircraft: "",
  });

  useEffect(() => {
    getFlights();
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = (flight) => {
    setCurrentFlight(flight);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setCurrentFlight({ ...currentFlight, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editFlights(
      currentFlight._id,
      currentFlight.departure,
      currentFlight.arrival,
      currentFlight.seats,
      currentFlight.aircraft
    );
    handleClose();
  };

  const handleDelete = (flight) => {
    if (window.confirm("ARE YOU SURE YOU WANT TO CANCEL YOUR FLIGHT ???")) {
      deleteFlights(flight._id);
    }
  };
  if (!flights) {
    return (
      <div>
        <h1>NO FLIGHTS BOOKED YET</h1>
      </div>
    );
  }
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      {flights.map((flight) => (
        <div className="card w-60 mb-5" key={flight._id}>
          <div className="card-body">
            <h5 className="card-title">Departure: {flight.departure}</h5>
            <h5 className="card-title">Arrival: {flight.arrival}</h5>
            <h5 className="card-text">Seats: {flight.seats}</h5>
            <h5 className="card-text">Aircraft: {flight.aircraft}</h5>
            <Button variant="primary" onClick={() => handleShow(flight)}>
              MANAGE
            </Button>
            <Button
              className="mx-3"
              variant="primary"
              onClick={() => handleDelete(flight)}
            >
              DELETE
            </Button>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formDeparture">
              <Form.Label>Departure</Form.Label>
              <Form.Control
                type="text"
                name="departure"
                value={currentFlight.departure}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formArrival">
              <Form.Label>Arrival</Form.Label>
              <Form.Control
                type="text"
                name="arrival"
                value={currentFlight.arrival}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSeats">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                name="seats"
                value={currentFlight.seats}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAircraft">
              <Form.Label>Aircraft</Form.Label>
              <Form.Control
                type="text"
                name="aircraft"
                value={currentFlight.aircraft}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Manage;
