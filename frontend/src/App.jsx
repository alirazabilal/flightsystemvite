import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Books from "./component/Book";
import Manage from "./component/Manage";
import Signup from "./component/Signup";
import Login from "./component/Login";
import FlightState from "./context/notes/flightState"; // Correct capitalization
import BookOriginal from "./component/BookOriginal";
import Book from "./component/Book";

function App() {
  return (
    <>
      <FlightState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/book" element={<Books />} />
              <Route exact path="/manage" element={<Manage />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/bookoriginal" element={<BookOriginal />} />
            </Routes>
          </div>
        </Router>
      </FlightState>
    </>
  );
}

export default App;
