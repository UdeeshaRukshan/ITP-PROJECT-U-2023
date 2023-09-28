import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllArts.css"; // Import your CSS file

export default function AllArts() {
  // State to store art data
  const [arts, setArts] = useState([]);

  // Fetch art data from the server
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

  // Render art items
  const renderArtItems = () => {
    return arts.map((art) => (
      <div key={art._id} className="art-item">
        <div className="art-details">
          <h3>{art.title}</h3>
          <p>Medium: {art.medium}</p>
          <p>
            Size: {art.height} x {art.width}
          </p>
          <p>Condition: {art.condition}</p>
          <p>Location: {art.location}</p>
          <p>Value: {art.value}</p>
          {/* Add image display logic here */}
          <img src={art.images} alt={art.title} />
        </div>
        <div className="art-actions">
          <button
            className="update-button"
            onClick={() => handleUpdate(art._id)}
          >
            Update
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(art._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  // Handle "Update" button click
  const handleUpdate = (artId) => {
    // Add your update logic here
    alert(`Update Art with ID: ${artId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (artId) => {
    // Add your delete logic here
    alert(`Delete Art with ID: ${artId}`);
  };

  return <div className="art-container">{renderArtItems()}</div>;
}
