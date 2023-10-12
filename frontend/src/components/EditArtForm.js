import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import './EditArtForm.css';

export default function EditArtForm() {
  const { artid } = useParams(); // Get the art ID from the URL parameter
  const [updatedArt, setUpdatedArt] = useState({});

  useEffect(() => {
    // Fetch art data for editing based on the art ID
    async function fetchArtData() {
      try {
        const response = await axios.get(`http://localhost:8070/art/getarts/${artid}`);
        setUpdatedArt(response.data.Art);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArtData();
  }, [artid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedArt({ ...updatedArt, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8070/art/updateart/${artid}`, updatedArt);
      window.location.href = '/getarts'; // Redirect to the list of arts after successful update
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    window.location.href = '/getarts'; // Redirect to the list of arts without saving changes
  };

  return (
    <div className="edit-art-form-container">
      <h2>Edit Art</h2>
      <form onSubmit={handleSubmit}>
        <label className="edit-art-form-label">
          Title:
          <textarea
            name="title"
            className="edit-art-form-textarea"
            placeholder="e.g., Starry night by Vincent van Gogh"
            required
            value={updatedArt.title}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Medium:
          <input
            type="text"
            name="medium"
            className="edit-art-form-input"
            placeholder="e.g., canvas, wood, clay, paint, etc."
            required
            value={updatedArt.medium}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Height (cm):
          <input
            type="number"
            name="height"
            className="edit-art-form-input"
            placeholder="e.g., 120"
            required
            value={updatedArt.height}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Width (cm):
          <input
            type="number"
            name="width"
            className="edit-art-form-input"
            placeholder="e.g., 145"
            required
            value={updatedArt.width}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Describe the condition of the art:
          <textarea
            name="condition"
            className="edit-art-form-textarea"
            placeholder="e.g., Minor crease at lower left corner"
            required
            value={updatedArt.condition}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Location:
          <select
            name="location"
            required
            value={updatedArt.location}
            onChange={handleInputChange}
          >
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kaduwela">Kaduwela</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Anuradhapura">Anuradhapura</option>
          </select>
        </label>
        <label className="edit-art-form-label">
          Value ($):
          <input
            type="number"
            name="value"
            className="edit-art-form-input"
            placeholder="e.g., 120"
            required
            value={updatedArt.value}
            onChange={handleInputChange}
          />
        </label>
        <div className="edit-art-form-button-container">
          <button type="submit" className="edit-art-form-save-button">
            Save
          </button>
          <a href="/getarts" className="edit-art-form-cancel-button">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
