import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVehicles.css"; // Import your CSS file

export default function AllVehicles() {
  // State to store vehicle data
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicle data from the server
  useEffect(() => {
    async function fectchVehicles() {
      try {
        const response = await axios.get("http://localhost:8070/vehicle/getvehicles");
        setVehicles(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fectchVehicles();
  }, []);

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image.dataUrl}
        alt={`Vehicle ${index + 1}`}
      />
    ));
  };


  // Render vehicle rows
  const renderVehicleRaws = () => {
    return vehicles.map((vehicle) => (
      <tr key={vehicle._id}>
        <td>{vehicle.vehicleNumber}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.year}</td>
        <td>{vehicle.fuelType}</td>
        <td>{vehicle.mileage}</td>
        <td>{vehicle.features}</td>
        <td>{vehicle.location}</td>
        <td>{vehicle.value}</td>
        <td>{renderImages(vehicle.images)}</td>
        <td>
        <div className="button-container">
          <button className="approve-button" onClick={() => handleApprove(vehicle._id)}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(vehicle._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  // Handle "Update" button click
  const handleApprove = (vehicleid) => {
    // Add update logic here
    alert(`Approved vehicle with ID: ${vehicleid}`);
  };

  // Handle "Delete" button click
  const handleDelete = (vehicleid) => {
    // Add delete logic here
    alert(`Deleted vehicle with ID: ${vehicleid}`);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Year</th>
            <th>Model</th>
            <th>Fuel Type</th>
            <th>Mileage(Km)</th>
            <th>Features</th>
            <th>Location</th>
            <th>Value(Rs)</th> 
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderVehicleRaws()}</tbody>
      </table>
    </div>
  );
}