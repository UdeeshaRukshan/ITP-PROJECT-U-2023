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
        const response = await axios.get(
          "http://localhost:4042/auctioneer/getauctioneers"
        );
        setAuctioneers(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchAuctioneers();
  }, []);

  // Render auctioneer items in a catalog-like box
  const renderAuctioneerItems = () => {
    return auctioneers.map((auctioneer) => (
      <div key={auctioneer._id} className="catalog-item">
        <div className="item-details">
          <img
            className="img-fluid"
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          />
          <h3>{`${auctioneer.firstName} ${auctioneer.lastName}`}</h3>
        </div>
        <div className="item-actions">
          <button
            className="approve-button"
            onClick={() => handleApprove(auctioneer._id)}
          >
            Update
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(auctioneer._id)}
          >
            Delete
          </button>
        </div>
      </div>
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

  return <div className="catalog-container">{renderAuctioneerItems()}</div>;
}
