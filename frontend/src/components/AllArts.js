import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllArts.css"; // Import your CSS file

export default function AllArts() {
  // State to store auctioneer data
  const [arts, setArts] = useState([]);

  // Fetch auctioneer data from the server
  useEffect(() => {
    async function fetchArts() {
      try {
        const response = await axios.get("http://localhost:8070/art/getarts");
        setArts(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArts();
  }, []);

  // Render auctioneer rows
  const renderArtsRows = () => {
    return arts.map((art) => (
      <tr key={art._id}>
        <td>{art.title}</td>
        <td>{art.medium}</td>
        <td>{art.height}</td>
        <td>{art.width}</td>
        <td>{art.condition}</td>
        <td>{art.location}</td>
        <td>{art.value}</td>
        <td>{art.images}</td>
        <td>
        <div className="button-container">
          <button className="approve-button" onClick={() => handleApprove(art._id)}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(art._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  // Handle "Approve" button click
  const handleApprove = (artId) => {
    // Add your approval logic here
    alert(`Approved Auctioneer with ID: ${artId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (artId) => {
    // Add your delete logic here
    alert(`Deleted Auctioneer with ID: ${artId}`);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Medium</th>
            <th>Height(cm)</th>
            <th>Width(cm)</th>
            <th>Condition</th>
            <th>Location</th>
            <th>Value(Rs)</th>
            <th>Images</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderArtsRows()}</tbody>
      </table>
    </div>
  );
}
