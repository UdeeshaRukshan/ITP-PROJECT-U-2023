// Transaction.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Transaction.css";

function Transaction() {
  const navigate = useNavigate()

  return (
    <div className = "container" >
      <h1>Thank you for your Transaction!</h1>
      <p>
        Your item is now ready for pickup. Your winning bid number is #2001539.
        We have emailed your confirmation, and you can come to our location to
        collect your item. Please check your email for more details on how to
        claim your item. Thank you for participating!
      </p>
      <button className ="card-details-button" onClick={() => navigate('/edit-card')}>View your card details</button>
    </div>
  );
}

export default Transaction;




