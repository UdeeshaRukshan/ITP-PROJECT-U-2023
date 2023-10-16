import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const [paymentDetails, setPaymentDetails] = useState({});
  const navigate = useNavigate();
  const { paymentid } = useParams();

  useEffect(() => {
      // Mock data for payment details (replace this with actual data from your API)
        const mockPaymentDetails = {
          cardName: "John Doe",
          firstName: "John",
          cardNumber: "**** **** **** 1234",
          expiryDate: "12/23",
        };
    
        // Set the mock data initially
        setPaymentDetails(mockPaymentDetails);

    axios
      .get(`http://localhost:4042/payment/getpayment/${paymentid}`)
      .then((response) => {
        setPaymentDetails(response.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [paymentid]);

  const reviewDetails = {
    auctionItem: "Auction Item 1",
    yourBid: 60.0,
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const summaryStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "400px",
    textAlign: "left",
  };

  const headerStyle = {
    fontSize: "28px",
    marginTop: "0",
    marginBottom: "20px",
  };

  const subHeadingStyle = {
    fontSize: "20px",
    marginTop: "0",
    marginBottom: "10px",
  };

  const paymentDetailsStyle = {
    marginTop: "20px",
  };

  const buttonContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const backButtonStyle = {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
    backgroundColor: "#007bff",
    opacity: "0.7",
  };

  const payNowButtonStyle = {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
    backgroundColor: "#ff5733",
  };

  return (
    <div style={containerStyle}>
      <div style={summaryStyle}>
        <h2 style={headerStyle}>Transaction Summary</h2>
        <br />
        <div style={paymentDetailsStyle}>
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Auction Item: {reviewDetails.auctionItem}
          </p>
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Your Bid: ${reviewDetails.yourBid.toFixed(2)}
          </p>
        </div>
        <div style={paymentDetailsStyle}>
          <h4 style={subHeadingStyle}>Payment Details</h4>
          <br />
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Card Name: {paymentDetails.cardName}
          </p>
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Card Holder: {paymentDetails.firstName}
          </p>
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Card Number: {paymentDetails.cardNumber}
          </p>
          <p style={{ ...subHeadingStyle, textAlign: "left" }}>
            Expiry Date: {paymentDetails.expiryDate}
          </p>
        </div>
        <div style={buttonContainerStyle}>
          <button style={backButtonStyle} onClick={() => navigate("/payment")}>
            Back
          </button>
          <button
            style={payNowButtonStyle}
            onClick={() => navigate("/transaction")}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
