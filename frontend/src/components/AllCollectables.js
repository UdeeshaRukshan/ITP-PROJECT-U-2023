import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllCollectables.css"; 

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
          <button className="delete-button" onClick={() => handleDeleteClick(collectable._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  const handleDeleteClick = async (collectableId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/collectable/deletecollectable/${collectableId}`);

        setCollectables((prevCollectables) => prevCollectables.filter((collectable) => collectable._id !== collectableId));
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
            <th>Type</th>
            <th>Name</th>
            <th>Value($)</th>
            <th>Description</th>
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderCollectableRows()}</tbody>
      </table>
    </div>
  );
}
