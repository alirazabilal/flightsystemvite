import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        if (json) {
          setUser(json);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FLYNAS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-5">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link
                className={`nav-link ${
                  location.pathname === "/book" ? "active" : ""
                }`}
                to="/book"
                aria-disabled={!isLoggedIn}
                style={{ pointerEvents: isLoggedIn ? "auto" : "none" }}
              >
                SEND REQUEST TO ADMIN BOOK A FLIGHT
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link
                className={`nav-link ${
                  location.pathname === "/manage" ? "active" : ""
                }`}
                to="/manage"
              >
                MANAGE/CHECK FLIGHT STATUS
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link
                className={`nav-link ${
                  location.pathname === "/bookoriginal" ? "active" : ""
                }`}
                to="/bookoriginal"
              >
                SEE AND BOOK AVAILABLE FLIGHTS
              </Link>
            </li>
          </ul>

          <form className="d-flex" role="search">
            {user ? (
              <>
                <span className="navbar-text mx-2">Hello, {user.name}</span>
                <button className="btn btn-primary mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  LOGIN
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  SIGNUP
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
