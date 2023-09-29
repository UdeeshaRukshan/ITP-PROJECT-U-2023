import React from "react";
import { useNavigate } from "react-router-dom";
import "./Review.css";

const Review = () => {
  const navigate = useNavigate()
  // You can fetch review details and payment details from your data source or props here
  const reviewDetails = {
    auctionItem: "Auction Item 1",
    yourBid: 60.0,
  };

  const paymentDetails = {
    cardName: "Visa",
    cardHolder: "John Doe",
    cardNumber: "xxxx-xxxx-xxxx-1234",
    expiryDate: "12/25",
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
          <p>Card Name: {paymentDetails.cardName}</p>
          <p>Card Holder: {paymentDetails.cardHolder}</p>
          <p>Card Number: {paymentDetails.cardNumber}</p>
          <p>Expiry Date: {paymentDetails.expiryDate}</p>
        </div>
        <div className="action-buttons">
          <button className="back-button" onClick={() => navigate('/payment')}>
            Back
          </button>
          <button className="pay-now-button" onClick={() => navigate('/transaction')}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;