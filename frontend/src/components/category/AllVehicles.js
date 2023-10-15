import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVehicles.css"; // Import your CSS file
import { SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom";
import moment from 'moment-timezone';

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
        const convertedData = response.data.map(item => {
          const sriLankaStartTime = moment(item.startTime).tz('Asia/Colombo');
          const sriLankaEndTime = moment(item.endTime).tz('Asia/Colombo');
          const formattedStartTime = sriLankaStartTime.format('MMM DD, YYYY, h:mm A');
          const formattedEndTime = sriLankaEndTime.format('MMM DD, YYYY, h:mm A');
          return {
            ...item,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        });
        setVehicles(convertedData);
        console.log(convertedData);
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
            src={vehicle.image?vehicle.image:null} // Use property-specific image URL
            alt={`Vehicle ${vehicle.model}`}
          />
          <div className="item-details">
            <h3>{vehicle.model}</h3>
            <p className="price">${vehicle.value}</p> {/* Add price */}
          </div>
          <div className="item-actions">
            <Link
              to={`/vehicle-view/${vehicle._id}`}
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
      <Link to={"/addvehicle"}>
        <button
          onClick={() => console.log("Button Clicked")}
          style={{
            marginLeft: '10px', 
            marginBottom: '10px', 
            backgroundColor: '#3fa34d', 
            color: 'white', 
            padding: '20px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginLeft: 1250 }}

            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6bbf59';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3fa34d';
            }}
        >
          Add Vehicle
        </button><br></br>
      </Link>
      <SimpleGrid cols={3}>{renderVehicleItems()}</SimpleGrid>
    </div>
  );
}
