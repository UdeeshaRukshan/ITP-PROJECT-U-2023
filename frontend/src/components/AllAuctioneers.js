import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css";
// Import the update form component

export default function AllAuctioneers() {
  // State to store auctioneer data
  const [auctioneers, setAuctioneers] = useState([]);
  const [selectedAuctioneer, setSelectedAuctioneer] = useState(null);

  // Fetch auctioneer data from the server
  useEffect(() => {
    async function fetchAuctioneers() {
      try {
        const response = await axios.get(
          "http://localhost:8070/auctioneer/getauctioneers"
        );
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
          <div className="all-auc-button-container">
            <button
              className="all-auc-delete-button"
              onClick={() => handleDeleteClick(auctioneer._id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  const handleDeleteClick = async (auctioneerId) => {
    // ... Your delete logic
  };

  const handleUpdateClick = (auctioneer) => {
    setSelectedAuctioneer(auctioneer); // Set the selected auctioneer for updating
  };

  const handleCancelUpdate = () => {
    setSelectedAuctioneer(null); // Reset the selected auctioneer
  };

  return (
    <div className="all-auc-container">
      <table className="all-auc-table">
        <thead className="all-auc-thead">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Street</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderAuctioneerRows()}</tbody>
      </table>
    </div>
  );
}
