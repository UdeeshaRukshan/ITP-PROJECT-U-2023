import React, { useEffect, useState } from "react";
import axios from "axios";
import "../payments/PaymentList.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment data from your API
    axios.get("http://localhost:8070/payment/getpayments").then((response) => {
      setPayments(response.data); // Assuming your API returns an array of payment data
    });
  }, []);

  return (
    <div>
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
              <td>{payment.cardNumber}</td>
              <td>{payment.expiryDate}</td>
              <td>{payment.cvv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
