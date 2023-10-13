import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css"; 

export default function AllAuctioneers() {
  const [auctioneers, setAuctioneers] = useState([]);

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
  
  const renderAuctioneerRows = () => {
    return auctioneers.map((auctioneer, index) => (
      <tr key={auctioneer._id} className={index % 2 === 0 ? "all-auc-even-row" : "all-auc-odd-row"}>
        <td>{auctioneer.firstName}</td>
        <td>{auctioneer.lastName}</td>
        <td>{auctioneer.email}</td>
        <td>{auctioneer.contactNumber}</td>
        <td>{auctioneer.address}</td>
        <td>{auctioneer.street}</td>
        <td>{auctioneer.city}</td>
        <td>
          <div className="all-auc-button-container">
            <button className="delete-button-allauc" onClick={() => handleDeleteClick(auctioneer._id)}>
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
    <div className="all-auc-container">
      <h2 className="all-auc-header">All Auctioneers</h2>
      <table className="all-auc-table">
        <thead className="all-auc-thread">
          <tr className="tr-all-auc">
            <th className="all-auc-th">First Name</th>
            <th className="all-auc-th">Last Name</th>
            <th className="all-auc-th">Email</th>
            <th className="all-auc-th">Contact Number</th>
            <th className="all-auc-th">Address</th>
            <th className="all-auc-th">Street</th>
            <th className="all-auc-th">City</th>
            <th className="all-auc-th">Actions</th> 
          </tr>
        </thead>
        <tbody className="all-auc-tbody">{renderAuctioneerRows()}</tbody>
      </table>
    </div>
  );
}
