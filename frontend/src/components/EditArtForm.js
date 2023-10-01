import React, { useState } from "react";

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
    <div className="edit-art-form">
      <h2>Edit Art</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={updatedArt.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Medium:
          <input
            type="text"
            name="medium"
            value={updatedArt.medium}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={updatedArt.height}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Width (cm):
          <input
            type="number"
            name="width"
            value={updatedArt.width}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Condition:
          <input
            type="text"
            name="condition"
            value={updatedArt.condition}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={updatedArt.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Value ($):
          <input
            type="number"
            name="value"
            value={updatedArt.value}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
