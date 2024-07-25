import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <figure className="figure">
            <img
              src="/flynas.png"
              className="figure-img img-fluid rounded mx-10 w-80"
              style={{ marginTop: "40px" }}
              alt="flynas"
            />
            <figcaption className="figure-caption">
              FLYNAS - YOUR FLYING PARTNER
            </figcaption>
          </figure>
        </div>
        <div className="col-md-6">
          <figure className="figure">
            <img
              src="/flynas2.png"
              className="figure-img img-fluid rounded mx-10 w-77"
              style={{ marginTop: "40px", width: "460px" }}
              alt="flynas"
            />
            <figcaption className="figure-caption">
              GET READY FOR A BEAUTIFUL SUMMER VACATION
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="card-title my-5 mx-5">LOGIN TO MAKE A BOOKING</div>
      <div className="card">
        <div className="card-body">
          Founded in 2007, flynas, formerly known as Nas Air, has grown to
          become Saudi Arabia's leading low-cost carrier. Initially launched
          with domestic flights, flynas expanded rapidly, offering international
          routes to key destinations across the Middle East, Asia, and Europe.
          The airline operates a modern fleet of Airbus A320s and A321s, known
          for their efficiency and comfort. Over the years, flynas has garnered
          recognition for its affordable fares, punctuality, and commitment to
          passenger satisfaction, making it a preferred choice for both leisure
          and business travelers in the region.
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <figure className="figure">
            <img
              src="/flynas3.png"
              className="figure-img img-fluid rounded mx-10 w-50"
              style={{ marginTop: "35px" }}
              alt="flynas"
            />
            <a href="/book" className="figure-caption btn btn-primary mx-4">
              BOOK
            </a>
          </figure>
        </div>
        <div className="col-md-6">
          <figure className="figure mx-20">
            <img
              src="/flynas4.png"
              className="figure-img img-fluid rounded mx-20 w-60"
              style={{ marginTop: "35px" }}
              alt="flynas"
            />
            <a href="/book" className="figure-caption btn btn-primary mx-4">
              BOOK
            </a>
          </figure>
        </div>
      </div>

      <div className="card">
        <div className="card-header">WANT TO TRAVEL?</div>
        <div className="card-body">
          <h5 className="card-title">BOOK A FLIGHT IN OUR LUXURY PLANES</h5>
          <p className="card-text">CLICK ON THE BUTTON BELOW TO BOOK !!!</p>
          <a href="/book" className="btn btn-primary">
            BOOK A FLIGHT
          </a>
        </div>
      </div>

      <div className="card text-center my-3">
        <div className="card-body">
          <h5 className="card-title">THANK YOU FOR VISITING</h5>
          <p className="card-text">
            VISIT OUR OFFICIAL WEBSITE FOR MORE DETAILS
          </p>
          <a href="https://www.flynas.com/" className="btn btn-primary">
            FLYNAS --- MORE DETAILS
          </a>
        </div>
        <div className="card-footer text-body-secondary">2 days ago</div>
      </div>
    </div>
  );
};

export default Home;
