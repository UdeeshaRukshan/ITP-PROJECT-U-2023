import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVehicles.css"; 

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
        <div className="all-vehicle-button-container">
          <button className="all-vehicle-delete-button" onClick={() => handleDeleteClick(vehicle._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

 

  // Function to handle delete button click
  const handleDeleteClick = async (vehicleid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/vehicle/deletevehicle/${vehicleid}`);

        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle._id !== vehicleid));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="all-vehicle-container">
    <table className="all-vehicle-table">
      <thead className="all-vehicle-thead">
          <tr>
            <th>Vehicle Number</th>
            <th>Model</th>
            <th>Year</th>
            <th>Fuel Type</th>
            <th>Mileage(Km)</th>
            <th>Features</th>
            <th>Location</th>
            <th>Value($)</th> 
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderVehicleRaws()}</tbody>
      </table>
    </div>
  );
}