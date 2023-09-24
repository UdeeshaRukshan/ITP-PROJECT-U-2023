import React, { useState } from "react";
import "./VehicleForm.css";

function VehicleForm() {
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    images:[],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is "mileage" and whether the entered value is not a positive number
    if (name === "mileage" && (parseFloat(value) <= 0 || isNaN(parseFloat(value)))) {
      // If it's not a positive number, set it to an empty string
      setVehicleData({
        ...vehicleData,
        [name]: "",
      });
    } else if (name === "images") {
      // Handle multiple image files
      setVehicleData({
        ...vehicleData,
        [name]: files,
      });
    } else {
      // Otherwise, update the state normally
      setVehicleData({
        ...vehicleData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Vehicle data:", vehicleData);
  };

  return (
    <div className="container">
      <form action="/submit" method="POST" enctype="multipart/form-data">
      <h2>Vehicle Info</h2>
        <label htmlFor="vehicleNumber">Vehicle Number:</label>
        <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="e.g., ABC-2056" required/><br></br>

        <div className="row">
          <div className="col">
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" name="model" placeholder="e.g., Honda Civic" required/><br></br>
          </div>
          <div className="col">
            <label htmlFor="year">Manufacture Year:</label>
            <input type="date" id="year" name="year" required/><br></br>
          </div>
        </div>

        <div className="row">
  <div className="col">
    <label htmlFor="fuelType">Fuel Type:</label>
    <select class="form-select"
      id="fuelType"
      name="fuelType"
      value={vehicleData.fuelType}
      onChange={handleChange}
      required
    >
      <option value="">Select Fuel Type</option>
      <option value="Petrol">Petrol</option>
      <option value="Diesel">Diesel</option>
      <option value="Electric">Electric</option>
      <option value="Hybrid">Hybrid</option>
    </select>
  </div>
  <div className="col">
    <label htmlFor="mileage">Mileage:</label>
    <input
      type="text"
      id="mileage"
      name="mileage"
      value={vehicleData.mileage}
      onChange={handleChange}
      placeholder="e.g., 3200"
      required
    />
  </div>
    </div>

        <label htmlFor="features">Features:</label>
        <textarea id="features" name="features" placeholder="Mention the condition of your vehicle." required></textarea><br></br>

        <label htmlFor="location">Location:</label>
        <select class="form-select"
          id="location"
          name="location"
          value={vehicleData.location}
          onChange={handleChange}
          required
        >
          <option value="">Select Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select><br />

        <label htmlFor="openingValue">Opening Value:(Rs)</label>
        <input type="text" id="openingValue" name="openingValue" placeholder="e.g., 60lakhs" required/><br/>

        <label htmlFor="image">Images:(Please add at least 6 photos of the interior and exterior of the vehicle) </label>
        <input type="file" id="images" name="images" accept="image/*" multiple required/><br></br>

        <div className="row justify-content-center">
          {/* Center the buttons within a row */}
          <div className="col-auto">
            <button type="button" className="btn btn-secondary btn-lg">Back</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;
