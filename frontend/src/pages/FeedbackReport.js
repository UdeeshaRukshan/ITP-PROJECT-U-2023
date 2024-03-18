import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "./FeedbackReport.css";

export default function AllFeedbacksUpdate() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await axios.get("http://localhost:4042/api/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchFeedbacks();
  }, []);

  const generateReportForFeedback = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 10, 10);

    let yOffset = 20; // Initial Y offset
    let plusYOffset = 5;
doc.setFontSize(12);
    feedbacks.forEach((feedback) => {
      doc.text(`Customer Name: ${feedback.customerName}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`Email Address: ${feedback.email}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`Satisfied: ${feedback.satisfied}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`Rate: ${feedback.rate}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`Recommendation: ${feedback.recommendation}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`User: ${feedback.user}`, 10, yOffset);
      yOffset += plusYOffset;

      doc.text(`Created At: ${feedback.createdAt}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save("feedbacks_report.pdf");
  };
  

  const renderFeedbacksRows = () => {
    return feedbacks.map((feedback) => {
      const originalTimestamp = new Date(feedback.createdAt);
      const formattedTimestamp = originalTimestamp.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <tr key={feedback._id}>
          <td>{feedback.customerName}</td>
          <td>{feedback.email}</td>
          <td>{feedback.satisfied}</td>
          <td>{feedback.rate}</td>
          <td>{feedback.recommendation}</td>
          <td>{feedback.user}</td>
          <td>{formattedTimestamp}</td>
        </tr>
      );
    });
  };

  return (
    <div className="all-arts-container">
      <h1 className="all-arts-header-center">All Feedbacks</h1>
      <br></br>
      <button
            className="all-arts-generate-report-button"
            onClick={() => generateReportForFeedback()}
          >
            Generate Report
          </button>
      <table className="all-arts-table">
        <thead className="all-arts-thread">
          <tr className="tr-all-arts">
            <th className="all-arts-th">Customer Name</th>
            <th className="all-arts-th">Email Address</th>
            <th className="all-arts-th">Satisfaction</th>
            <th className="all-arts-th">Rate</th>
            <th className="all-arts-th">Recommendation</th>
            <th className="all-arts-th">User Email</th>
            <th className="all-arts-th">Created At</th>
          </tr>
        </thead>
        <tbody className="all-arts-tbody">{renderFeedbacksRows()}</tbody>
      </table>
    </div>
  );
}
