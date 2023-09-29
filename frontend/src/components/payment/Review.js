import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Review.css";

const Review = ({ paymentid }) => {
  // Create a state for storing payment details
  const [paymentDetails, setPaymentDetails] = useState({});
  const navigate = useNavigate();

  // Fetch payment data from API
  useEffect(() => {
    axios
      .get(`http://localhost:8070/payment/getpayment/${paymentid}`)
      .then((response) => {
        setPaymentDetails(response.data); // Assuming API returns an object of payment data
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [paymentid]); // Include paymentid in the dependency array

  // Define review details (assuming this data comes from props or elsewhere)
  const reviewDetails = {
    auctionItem: "Auction Item 1",
    yourBid: 60.0,
  };

  return (
    <div className="transaction-summary-container">
      <div className="transaction-summary">
        <h2>Transaction Summary</h2>
        <br />
        <div className="review-details">
          <p>Auction Item: {reviewDetails.auctionItem}</p>
          <p>Your Bid: ${reviewDetails.yourBid.toFixed(2)}</p>
        </div>
        <div className="payment-details">
          <h4>Payment Details</h4>
          <br />
          <p>Card Name: {paymentDetails.cardName}</p>
          <p>Card Holder: {paymentDetails.firstName}</p>
          <p>Card Number: {paymentDetails.cardNumber}</p>
          <p>Expiry Date: {paymentDetails.expiryDate}</p>
        </div>
        <div className="action-buttons">
          <button className="back-button" onClick={() => navigate("/payment")}>
            Back
          </button>
          <button
            className="pay-now-button"
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
