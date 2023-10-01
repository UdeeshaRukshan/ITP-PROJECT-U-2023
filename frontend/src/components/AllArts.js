import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllArts.css"; 
import EditArtForm from "./EditArtForm"; // Replace "./EditArtForm" with the correct path to your EditArtForm component file.


export default function AllArts() {
  // State to store art data
  const [arts, setArts] = useState([]);
  const [editingArt, setEditingArt] = useState(null);

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

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image.dataUrl}
        alt={`Art ${index + 1}`}
      />
    ));
  };

  
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
        <td>
        <td>{renderImages(art.images)}</td>
      </td>
      <td>
        <div className="all-arts-button-container">
        <button
              className="all-arts-edit-button"
              onClick={() => handleEditClick(art)}
            >
              Edit
            </button>
          <button className="all-arts-delete-button" onClick={() => handleDeleteClick(art._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  const handleUpdateArt = async (updatedArt) => {
    try {
      await axios.put(`http://localhost:8070/art/updateart/${updatedArt._id}`, updatedArt);
      setArts((prevArts) =>
        prevArts.map((art) =>
          art._id === updatedArt._id ? updatedArt : art
        )
      );
      setEditingArt(null); // Close the edit form/modal
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = async (artId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this art piece?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/art/deleteart/${artId}`);

        setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditClick = (art) => {
    setEditingArt(art);
  };
  

  return (
    <div className="all-arts-container">
      <table className="all-arts-table">
        <thead className="all-arts-thead">
          <tr>
            <th>Title</th>
            <th>Medium</th>
            <th>Height(cm)</th>
            <th>Width(cm)</th>
            <th>Condition</th>
            <th>Location</th>
            <th>Value($)</th>
            <th>Images</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderArtsRows()}</tbody>
      </table>
      {editingArt && (
        <EditArtForm
          art={editingArt}
          onUpdateArt={handleUpdateArt}
          onCancel={() => setEditingArt(null)}
        />
      )}
    </div>
  );
}
