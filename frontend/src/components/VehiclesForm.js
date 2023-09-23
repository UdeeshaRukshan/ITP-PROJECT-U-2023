import React, { useState } from "react";
import "./VehicleForm.css";
function VehicleForm() {
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Vehicle data:", vehicleData);
  };

  return (
    <div className="vehicle-form">
      <h2>Add a New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <input
            type="text"
            name="make"
            id="make"
            value={vehicleData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            name="model"
            id="model"
            value={vehicleData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            name="year"
            id="year"
            value={vehicleData.year}
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
            value={vehicleData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Vehicle</button>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;
