import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVehicles.css"; // Import your CSS file
import { SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom";
export default function AllVehicles() {
  // State to store vehicle data
  const [vehicles, setVehicles] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch vehicle data from the server
  const handleAddToWishlist = async (vehicleId) => {
    console.log(vehicleId);

    try {
      const response = await axios.post(
        "http://localhost:4042/api/add-to-wishlist",
        { itemId: vehicleId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage("Item added to wishlist successfully.");
      } else {
        setMessage("Error adding item to wishlist.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

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
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.813xw:0.721xh;0.0994xw,0.128xh&resize=1200:*" // Use property-specific image URL
            alt={`Vehicle ${vehicle._id}`}
          />
          <div className="item-details">
            <h3>{vehicle.model}</h3>
            <p className="price">${vehicle.value}</p> {/* Add price */}
          </div>
          <div className="item-actions">
            <Link
              to={`/vehicle/${vehicle._id}`}
              className="view-details-button"
              style={{ fontSize: 10 }}
            >
              View Details
            </Link>
            <button
              className="view-details-button"
              onClick={() => handleAddToWishlist(vehicle._id)}
              style={{ fontSize: 10 }}
            >
              Add to Wishlist
            </button>{" "}
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div style={{ marginTop: 100, marginLeft: 80 }}>
      <button
        onClick={() => console.log("Button Clicked")}
        style={{ marginLeft: 20, marginBottom: 10, marginLeft: 1125 }}
      >
        Add Vehicle
      </button>
      <SimpleGrid cols={3}>{renderVehicleItems()}</SimpleGrid>
    </div>
  );
}
