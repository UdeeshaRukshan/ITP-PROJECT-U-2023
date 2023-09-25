import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  const backgroundc = () => {
    return { backgroundColor: "#363753", color: "white" };
  };
  const margin = {
    margin: "15vh",
  };
  return (
    <div className="" style={backgroundc()}>
      <div
        className=" d-flex justify-content-center align-items-center "
        style={{ width: "100%", height: "34vh" }}
      >
        <div className="" style={margin}>
          Auctionpal logo
        </div>
        <div style={margin}>How it works</div>
        <div style={margin}>Sellers</div>
        <div style={margin}>Social media </div>
      </div>
    </div>
  );
};

export default Footer;
