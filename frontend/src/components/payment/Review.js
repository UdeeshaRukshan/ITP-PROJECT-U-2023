import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Review.css";

const Review = ({ paymentid }) => {
  // create a state for storing payments details
  const [payments, setPayments] = useState([]);

  // Fetch payment data from API
  useEffect(() => {
    axios
      .get(`http://localhost:8070/payment/getpayment/${paymentid}`)
      .then((response) => {
        setPayments(response.data); // Assuming API returns an array of payment data
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [paymentid]); // Include paymentid in the dependency array

  const navigate = useNavigate();

  // You can fetch review details and payment details from your data source or props here
  const reviewDetails = {
    auctionItem: "Auction Item 1",
    yourBid: 60.0,
  };

  return (
    <div className="transaction-summary-container">
      <div className="transaction-summary">
        <h2>Transaction Summary</h2>
        <br></br>
        <div className="review-details">
          <p>Auction Item: {reviewDetails.auctionItem}</p>
          <p>Your Bid: ${reviewDetails.yourBid.toFixed(2)}</p>
        </div>
        <div className="payment-details">
          <h4>Payment Details</h4>
          <br></br>
          <p>Card Name: {payments.cardName}</p>
          <p>Card Holder: {payments.firstName}</p>
          <p>Card Number: {payments.cardNumber}</p>
          <p>Expiry Date: {payments.expiryDate}</p>
        </div>
        <div className="action-buttons">
          <button className="back-button" onClick={() => navigate("/payment")}>
            Back
          </button>
          <button className="pay-now-button" onClick={() => navigate("/transaction")}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;







