import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllCollectables.css"; // Import CSS file

export default function AllCollectables() {
  // State to store collectable data
  const [collectables, setCollectables] = useState([]);

  // Fetch collectable data from the server
  useEffect(() => {
    async function fetchCollectables() {
      try {
        const response = await axios.get("http://localhost:8070/collectable/getcollectables");
        setCollectables(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchCollectables();
  }, []);

  // Render collectable rows
  const renderCollectableRows = () => {
    return collectables.map((collectable) => (
      <tr key={collectable._id}>
        <td>{collectable.type}</td>
        <td>{collectable.name}</td>
        <td>{collectable.value}</td>
        <td>{collectable.description}</td>
        <td>{collectable.images}</td>
        <td>
        <div className="button-container">
          <button className="approve-button" onClick={() => handleApprove(collectable._id)}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(collectable._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  // Handle "Approve" button click
  const handleApprove = (collectableId) => {
    // Add your approval logic here
    alert(`Approved Auctioneer with ID: ${collectableId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (collectableId) => {
    // Add your delete logic here
    alert(`Deleted Auctioneer with ID: ${collectableId}`);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Value</th>
            <th> Description</th>
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderCollectableRows()}</tbody>
      </table>
    </div>
  );
}
