import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../components/categoriesUpdate/AllVehiclesUpdate.css";
import jsPDF from "jspdf";

export default function AllVehiclesUpdate() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fectchVehicles() {
      try {
        const response = await axios.get(
          "http://localhost:4042/vehicle/getvehicles"
        );
        setVehicles(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fectchVehicles();
  }, []);

  const handleDeleteClick = async (vehicleid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:4042/vehicle/deletevehicle/${vehicleid}`
        );

        setVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle._id !== vehicleid)
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const generateReportForVehicle = (vehicle) => {
    const doc = new jsPDF();
    doc.text(`Vehicle Report - ${vehicle.fuelType}`, 10, 10);
    <br></br>;
    doc.text(`Vehicle Number: ${vehicle.vehicleNumber}`, 10, 20);
    <br></br>;
    doc.text(`Model: ${vehicle.model}`, 10, 30);
    <br></br>;
    doc.text(`Year: ${vehicle.year}`, 10, 40);
    <br></br>;
    doc.text(`Fuel Type: ${vehicle.fuelType}`, 10, 50);
    <br></br>;
    doc.text(`Mileage(km): ${vehicle.mileage}`, 10, 60);
    <br></br>;
    doc.text(`Features: ${vehicle.features}`, 10, 70);
    <br></br>;
    doc.text(`Location: ${vehicle.location}`, 10, 80);
    <br></br>;
    doc.text(`Value ($): ${vehicle.value}`, 10, 90);

    doc.save(`${vehicle.fuelType}_report.pdf`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img key={index} src={image.dataUrl} alt={`Vehicle ${index + 1}`} />
    ));
  };

  const renderVehicleRaws = () => {
    const filteredVehicles = vehicles.filter((vehicle) =>
      vehicle.fuelType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredVehicles.map((vehicle) => (
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
          <Link to={`/updatevehicle/${vehicle._id}`}>
            <button className="all-veh-edit-button">Edit</button>
          </Link>
          <button
            className="delete-button-allvehicle"
            onClick={() => handleDeleteClick(vehicle._id)}
          >
            Delete
          </button>
          <button
            className="all-veh-generate-report-button"
            onClick={() => generateReportForVehicle(vehicle)}
          >
            Generate Report
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="all-vehicle-container">
      <h2 className="all-vehicle-header">All Vehicles</h2>
      <div className="all-veh-search-container">
        <input
          type="text"
          placeholder="Search by type of the fuel type"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
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
