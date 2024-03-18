import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4042/payment/getpayments")
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
    const maskedDigits = "*".repeat(Math.max(0, cardNumber.length - 4));
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
    const doc = new jsPDF();
    const headerColor = [100, 100, 100];

    doc.text("AuctionPal - Payment Details", 20, 10);

    doc.autoTable({
      head: [["First Name", "Last Name", "Email", "Expiry Date"]],
      body: filteredPayments.map((payment) => [
        payment.firstName,
        payment.lastName,
        payment.email,
        payment.expiryDate,
      ]),
      startY: 20,
      headStyles: {
        fillColor: headerColor,
        textColor: [255, 255, 255],
      },
      bodyStyles: { textColor: [0, 0, 0] },
      theme: "striped",
    });

    doc.save("payment_details.pdf");
  };

  const styles = {
    paymentListContainer: {
      margin: "50px auto",
      maxWidth: "2000px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "15vh",
    },
    paymentListHeader: {
      color: "#000000",
      marginBottom: "20px",
    },
    searchBar: {
      display: "flex",
      marginBottom: "20px",
    },
    searchBarInput: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginRight: "10px",
    },
    searchBarButton: {
      backgroundColor: "#363753",
      color: "#ffffff",
      border: "none",
      padding: "10px 15px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    printPdfButton: {
      backgroundColor: "#ba2b00",
      color: "#ffffff",
      border: "none",
      padding: "10px 15px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    paymentListTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    paymentListTh: {
      backgroundColor: "#363753",
      color: "#ffffff",
      padding: "12px",
      textAlign: "left",
    },
    paymentListTd: {
      border: "1px solid #ddd",
      padding: "12px",
    },
    paymentListCardNumber: {
      maxWidth: "150px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    paymentListMasked: {
      fontFamily: "monospace",
    },
    evenRow: {
      backgroundColor: "#e5e5e5",
    },
    oddRow: {
      backgroundColor: "#ffffff",
    },
  };

  return (
    <div style={styles.paymentListContainer}>
      <h2 style={styles.paymentListHeader}>Payment List</h2>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by first name, last name, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBarInput}
        />
        <button onClick={handleSearch} style={styles.searchBarButton}>
          Search
        </button>
      </div>
      <button onClick={handlePrintPDF} style={styles.printPdfButton}>
        Print details as PDF
      </button>
      <table style={styles.paymentListTable}>
        <thead>
          <tr>
            <th style={styles.paymentListTh}>First Name</th>
            <th style={styles.paymentListTh}>Last Name</th>
            <th style={styles.paymentListTh}>Address</th>
            <th style={styles.paymentListTh}>Email</th>
            <th style={styles.paymentListTh}>Phone</th>
            <th style={styles.paymentListTh}>Card Name</th>
            <th style={styles.paymentListTh}>Card Number</th>
            <th style={styles.paymentListTh}>Expiry Date</th>
            <th style={styles.paymentListTh}>CVV</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr
              key={payment._id}
              style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td style={styles.paymentListTd}>{payment.firstName}</td>
              <td style={styles.paymentListTd}>{payment.lastName}</td>
              <td style={styles.paymentListTd}>{payment.address}</td>
              <td style={styles.paymentListTd}>{payment.email}</td>
              <td style={styles.paymentListTd}>{payment.phone}</td>
              <td style={styles.paymentListTd}>{payment.cardName}</td>
              <td style={styles.paymentListTd}>
                <span style={styles.paymentListCardNumber}>
                  {maskCardNumber(payment.cardNumber)}
                </span>
              </td>
              <td style={styles.paymentListTd}>{payment.expiryDate}</td>
              <td
                style={{ ...styles.paymentListTd, ...styles.paymentListMasked }}
              >
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
