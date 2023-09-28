import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVehicles.css"; // Import your CSS file

export default function AllVehicles() {
  // State to store vehicle data
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicle data from the server
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get(
          "http://localhost:4042/vehicle/getvehicles"
        );
        setVehicles(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchVehicles();
  }, []);

  // Render vehicle items in a catalog-like box
  const renderVehicleItems = () => {
    return vehicles.map((vehicle) => (
      <div key={vehicle._id} className="catalog-item">
        <div className="item-details">
          {/* Customize the content inside the catalog item as needed */}
          <h3>{`${vehicle.year} ${vehicle.model}`}</h3>
          <p>{`Vehicle Number: ${vehicle.vehicleNumber}`}</p>
          <p>{`Fuel Type: ${vehicle.fuelType}`}</p>
          <p>{`Mileage: ${vehicle.mileage}`}</p>
        </div>
        <div className="item-actions">
          <button
            className="approve-button"
            onClick={() => handleApprove(vehicle._id)}
          >
            Update
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(vehicle._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  // Handle "Update" button click
  const handleApprove = (vehicleId) => {
    // Add update logic here
    alert(`Approved vehicle with ID: ${vehicleId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (vehicleId) => {
    // Add delete logic here
    alert(`Deleted vehicle with ID: ${vehicleId}`);
  };

  return <div className="catalog-container">{renderVehicleItems()}</div>;
}
