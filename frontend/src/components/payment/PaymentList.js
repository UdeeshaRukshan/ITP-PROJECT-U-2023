import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentList.css";

const PaymentList = () => {
  //create a state for storing payments details
  const [payments, setPayments] = useState([]);

  // Fetch payment data from API
  useEffect(() => {
    axios.get("http://localhost:8070/payment/getpayments").then((response) => {
      setPayments(response.data); // Assuming API returns an array of payment data
    }).catch((err)=>{
      alert(err.message);
    })
  }, []);

  const maskCardNumber = (cardNumber) => {
    // Mask all but the last four digits
    const visibleDigits = cardNumber.slice(-4);
    const maskedDigits = '*'.repeat(cardNumber.length - 4);
    return maskedDigits + visibleDigits;
  };

  const maskCVV = (cvv) => {
    // Mask CVV with asterisks
    return '*'.repeat(cvv.length);
  };

  return (
    <div className="payment-list-container">
      <h2>Payment List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Card Name</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.firstName}</td>
              <td>{payment.lastName}</td>
              <td>{payment.address}</td>
              <td>{payment.email}</td>
              <td>{payment.phone}</td>
              <td>{payment.cardName}</td>
              <td>{maskCardNumber(payment.cardNumber)}</td>
              <td>{payment.expiryDate}</td>
              <td>{maskCVV(payment.cvv)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
