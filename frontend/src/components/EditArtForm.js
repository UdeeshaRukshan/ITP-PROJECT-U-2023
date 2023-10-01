import React, { useState } from "react";
import "./EditArtForm.css";

export default function EditArtForm({ art, onUpdateArt, onCancel }) {
  const [updatedArt, setUpdatedArt] = useState(art);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedArt({ ...updatedArt, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateArt(updatedArt);
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
            placeholder="e.g., Starry night by vincent van gogh"
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
            className="art-form-input"
            placeholder="e.g., canvas,wood,clay,paint etc."
            required
            value={updatedArt.medium}
            onChange={handleInputChange}
          />
        </label>

        <div className="edit-form-row">
          <div className="edit-form-col"></div>
        <label className="edit-art-form-label">
          Height (cm):
          <input
            type="number"
            name="height"
            className="art-form-input"
            placeholder="e.g., 120"
            required
            value={updatedArt.height}
            onChange={handleInputChange}
          />
        </label>
        </div>
        <div className="edit-form-col">
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
        </div>
        <label className="edit-art-form-label">
        Describe the condition of the art:
        </label>
          <textarea
            name="condition"
            className="edit-art-form-textarea"
            placeholder="e.g., Minor crease at lower left corner"
            required
            value={updatedArt.condition}
            onChange={handleInputChange}
          />
        <label className="edit-art-form-label">
          Location:
          </label>
          <select
            type="text"
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
        
        <label className="edit-art-form-label">
          Value ($):
          </label>
          <input
            type="number"
            name="value"
            className="art-form-input"
            placeholder="e.g., 120"
            value={updatedArt.value}
            onChange={handleInputChange}
          />
       
       <div className="edit-art-form-button-container">
  <button type="submit" className="edit-art-form-save-button">Save</button>
  <button type="button" className="edit-art-form-cancel-button" onClick={onCancel}>
    Cancel
  </button>
</div>
      </form>
    </div>
  );
}
