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
          <button className="delete-button-allvehicle" onClick={() => handleDeleteClick(vehicle._id)}>
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
    <h2 className="all-vehicle-header">All Vehicles</h2>
    <table className="all-vehicle-table">
      <thead className="all-vehicle-thread">
          <tr className="tr-all-vehicle">
            <th className="all-vehicle-th">Vehicle Number</th>
            <th className="all-vehicle-th">Model</th>
            <th className="all-vehicle-th">Year</th>
            <th className="all-vehicle-th">Fuel Type</th>
            <th className="all-vehicle-th">Mileage(Km)</th>
            <th className="all-vehicle-th">Features</th>
            <th className="all-vehicle-th">Location</th>
            <th className="all-vehicle-th">Value($)</th> 
            <th className="all-vehicle-th">Images</th> 
            <th className="all-vehicle-th">Action</th>
          </tr>
        </thead>
        <tbody className="all-vehicle-tbody">{renderVehicleRaws()}</tbody>
      </table>
    </div>
  );
}