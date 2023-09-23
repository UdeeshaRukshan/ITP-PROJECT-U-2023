import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Link } from "react-router-dom";

const IndexPage = () => {
  const boxStyle = {
    height: "250px",
    width: "250px", // Adjust the height as needed
  };
  const bar = {
    height: "100px",
  };

  return (
    <div className="bg-white">
      <div
        className="image container col-lg-4 bg-white my-5"
        style={{ width: "120vh", height: "50vh" }}
      >
        {" "}
        Image
      </div>
      <div className="category bg-success my-5 ">
        <h2 className="text-center">Explore categories</h2>
        <div className="container bg-success my-5">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="box bg-primary text-white mx-2" style={boxStyle}>
              1
            </div>
            <div className="box bg-danger text-white mx-2" style={boxStyle}>
              2
            </div>
            <div className="box bg-danger text-white mx-2" style={boxStyle}>
              3
            </div>
            <div className="box bg-warning text-dark mx-2" style={boxStyle}>
              4
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center d-flex justify-content-center align-items-center text-white bg-white my-5 "
        style={bar}
      >
        <div className="col-lg-8 bg-black text-center row" style={bar}>
          <div className="col">1</div>
          <div className="col">2</div>
          <div className="col">3</div>
        </div>
      </div>
      <h2 className="text-center">
        Do you want to publish your advertiestment ?
      </h2>
      <div
        className="d-flex justify-content-center align-items-center vh-50
      "
      >
        <Link to={"/dashbord"}>
          <button
            className=" mx-auto btn btn-success  fs-4 my-5
      "
            style={{ width: "400px", height: "100px" }}
          >
            <span className="fs-2">Join the AuctionPal</span>
          </button>
        </Link>
      </div>

      <div className="bg-warning">hehe</div>
    </div>
  );
};

export default IndexPage;
