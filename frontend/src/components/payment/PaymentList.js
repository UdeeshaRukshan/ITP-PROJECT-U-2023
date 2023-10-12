import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentList.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/payment/getpayments")
      .then((response) => {
        setPayments(response.data);
        setFilteredPayments(response.data);
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

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    if (searchTermLower.trim() === "") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((payment) => {
        return (
          payment.firstName.toLowerCase().includes(searchTermLower) ||
          payment.lastName.toLowerCase().includes(searchTermLower) ||
          payment.email.toLowerCase().includes(searchTermLower)
        );
      });
      setFilteredPayments(filtered);
    }
  };

    const handlePrintPDF = () => {
      // Use jsPDF to generate a PDF document
      const doc = new jsPDF();
    
      // Set color for the header
      const headerColor = [100, 100, 100]; // Dark gray color
      
      doc.text("Payment Details", 20, 10);
    
      doc.autoTable({
        head: [["First Name", "Last Name", "Email", "Expiry Date"]],
        body: filteredPayments.map((payment) => [
          payment.firstName,
          payment.lastName,
          payment.email,
          payment.expiryDate,
        ]),
        startY: 20, // Adjust the starting position to avoid overlapping with the title
        headStyles: {
          fillColor: headerColor, // Set header background color
          textColor: [255, 255, 255], // Set header text color to white
        },
        bodyStyles: { textColor: [0, 0, 0] }, // Set body text color to black
        theme: "striped", // Apply the striped theme
      });
    
      doc.save("payment_details.pdf");
    };

  return (
    <div className="payment-list-container">
      <h2 className="payment-list-header">Payment List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by first name, last name, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button className="print-pdf-button" onClick={handlePrintPDF}>Print details as PDF</button>
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
          {filteredPayments.map((payment) => (
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


