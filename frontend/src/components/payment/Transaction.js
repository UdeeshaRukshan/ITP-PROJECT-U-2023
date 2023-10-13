import React from "react";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();

  // Inline styles
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    margin: 0,
  };

  const transactionContainerStyle = {
    maxWdith: "1100px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const headerStyle = {
    color: "#363753",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    lineHeight: 1.8,
    fontSize: "1.2em",
    maxWidth: "80%",
    margin: "0 auto",
  };

  const buttonStyle = {
    display: "block",
    marginTop: "20px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "15px 30px",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <div style={transactionContainerStyle}>
        <h2 style={headerStyle}>Thank you for your Transaction!</h2>
        <p style={paragraphStyle}>
          Your item is now ready for pickup. Your winning bid number is
          #2001539. We have emailed your confirmation, and you can come to our
          location to collect your item. Please check your email for more
          details on how to claim your item. Thank you for participating!
        </p>
        <button style={buttonStyle} onClick={() => navigate("/edit-card")}>
          View your card details
        </button>
      </div>
    </div>
  );
}

export default Transaction;
