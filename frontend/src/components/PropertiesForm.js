import React, { useState } from "react";
import "./Properties.css";
function PropertyForm() {
  const [propertyData, setPropertyData] = useState({
    address: "",
    type: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Property data:", propertyData);
  };

  return (
    <div className="property-form">
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={propertyData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            name="type"
            id="type"
            value={propertyData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            value={propertyData.price}
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
            value={propertyData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Property</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
