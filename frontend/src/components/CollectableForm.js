import React, { useState } from "react";
import "./Collectable.css";
function CollectableForm() {
  const [collectableData, setCollectableData] = useState({
    name: "",
    description: "",
    year: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectableData({
      ...collectableData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Collectable data:", collectableData);
  };

  return (
    <div className="collectable-form">
      <h2>Add a New Collectable</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={collectableData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={collectableData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            name="year"
            id="year"
            value={collectableData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={collectableData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Collectable</button>
        </div>
      </form>
    </div>
  );
}

export default CollectableForm;
