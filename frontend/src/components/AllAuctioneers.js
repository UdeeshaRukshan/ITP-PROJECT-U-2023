import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css"; 

export default function AllAuctioneers() {
  // State to store auctioneer data
  const [auctioneers, setAuctioneers] = useState([]);

  // Fetch auctioneer data from the server
  useEffect(() => {
    async function fetchAuctioneers() {
      try {
        const response = await axios.get("http://localhost:8070/auctioneer/getauctioneers");
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
          <button className="delete-button" onClick={() => handleDeleteClick(auctioneer._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  const handleDeleteClick = async (auctioneerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete your details?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/auctioneer/delete/${auctioneerId}`);
        setAuctioneers((prevAuctioneers) => prevAuctioneers.filter((auctioneer) => auctioneer._id !== auctioneerId));
      } catch (error) {
        alert(error.message);
      }
    }
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
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>{renderAuctioneerRows()}</tbody>
      </table>
    </div>
  );
}
