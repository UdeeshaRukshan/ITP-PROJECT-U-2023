import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css"; // Import your CSS file

export default function AllAuctioneers() {
  // State to store auctioneer data
  const [auctioneers, setAuctioneers] = useState([]);

  // Fetch auctioneer data from the server
  useEffect(() => {
    async function fetchAuctioneers() {
      try {
        const response = await axios.get("http://localhost:8070/auctioneer/");
        setAuctioneers(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchAuctioneers();
  }, []);

  // Render auctioneer rows
  const renderAuctioneerRows = () => {
    return auctioneers.map((auctioneer) => (
      <tr key={auctioneer._id}>
        <td>{auctioneer.firstName}</td>
        <td>{auctioneer.lastName}</td>
        <td>{auctioneer.email}</td>
        <td>{auctioneer.contactNumber}</td>
        <td>{auctioneer.address}</td>
        <td>{auctioneer.street}</td>
        <td>{auctioneer.city}</td>
        <td>
        <div className="button-container">
          <button className="approve-button" onClick={() => handleApprove(auctioneer._id)}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(auctioneer._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  // Handle "Approve" button click
  const handleApprove = (auctioneerId) => {
    // Add your approval logic here
    alert(`Approved Auctioneer with ID: ${auctioneerId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (auctioneerId) => {
    // Add your delete logic here
    alert(`Deleted Auctioneer with ID: ${auctioneerId}`);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Street</th>
            <th>City</th>
            <th>Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>{renderAuctioneerRows()}</tbody>
      </table>
    </div>
  );
}
