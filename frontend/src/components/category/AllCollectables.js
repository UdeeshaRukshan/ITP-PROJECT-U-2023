import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css"; // Import your CSS file
import { Link } from "react-router-dom";
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
          <h3>{`${auctioneer.firstName} ${auctioneer.lastName}`}</h3>
        </div>
        <div className="item-actions">
          <Link to={`/collectables/${auctioneer._id}`} className="detail-link">
            View Details
          </Link>
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
