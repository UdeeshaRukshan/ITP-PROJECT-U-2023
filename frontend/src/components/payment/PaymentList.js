import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentList.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/payment/getpayments")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const maskCardNumber = (cardNumber) => {
    const visibleDigits = cardNumber.slice(-4);
    const maskedDigits = "*".repeat(cardNumber.length - 4);
    return maskedDigits + visibleDigits;
  };

  const maskCVV = (cvv) => {
    return "*".repeat(cvv.length);
  };

  return (
    <div className="payment-list-container">
      <h2 className="payment-list-header">Payment List</h2>
      <table className="payment-list-table">
        <thead className="payment-list-thread">
          <tr>
            <th className="payment-list-th">First Name</th>
            <th className="payment-list-th">Last Name</th>
            <th className="payment-list-th">Address</th>
            <th className="payment-list-th">Email</th>
            <th className="payment-list-th">Phone</th>
            <th className="payment-list-th">Card Name</th>
            <th className="payment-list-th">Card Number</th>
            <th className="payment-list-th">Expiry Date</th>
            <th className="payment-list-th">CVV</th>
          </tr>
        </thead>
        <tbody className="payment-list-tbody">
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="payment-list-td">{payment.firstName}</td>
              <td className="payment-list-td">{payment.lastName}</td>
              <td className="payment-list-td">{payment.address}</td>
              <td className="payment-list-td">{payment.email}</td>
              <td className="payment-list-td">{payment.phone}</td>
              <td className="payment-list-td">{payment.cardName}</td>
              <td className="payment-list-td payment-list-card-number">
                {maskCardNumber(payment.cardNumber)}
              </td>
              <td className="payment-list-td">{payment.expiryDate}</td>
              <td className="payment-list-td payment-list-masked">
                {maskCVV(payment.cvv)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;

