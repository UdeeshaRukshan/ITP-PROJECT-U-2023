import React, { useState, useEffect } from "react";
import axios from "axios";
import { SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AllProperties.css"; // Import CSS file

export default function AllProperties() {
  // State to store properties data
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = async (propertyId) => {
    console.log(propertyId);

    try {
      const response = await axios.post(
        "http://localhost:4042/api/add-to-wishlist",
        { itemId: propertyId },
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
  // Fetch properties data from the server
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get(
          "http://localhost:4042/property/getproperties"
        );
        setProperties(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchProperties();
  }, []);

  // Render property items in a catalog-like box
  const renderPropertyItems = () => {
    return properties.map((property) => (
      <div key={property._id} className="catalog-item">
        <div className="item-image">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg" // Use property-specific image URL
            alt={`Property ${property._id}`}
          />
        </div>
        <div className="item-details">
          <h3>{property.address}</h3>
          <p className="price">${property.value}</p> {/* Add price */}
        </div>
        <div className="item-actions">
          <Link
            to={`/property/${property._id}`}
            className="view-details-button"
            style={{ fontSize: 10 }}
          >
            View Details
          </Link>
          <button
            className="view-details-button"
            onClick={() => handleAddToWishlist(property._id)}
            style={{ fontSize: 10 }}
          >
            Add to Wishlist
          </button>{" "}
          {/* Add to cart button */}
        </div>
      </div>
    ));
  };

  // Return the JSX for rendering
  return (
    <div style={{ marginTop: 100, marginLeft: 80 }}>
      <button
        onClick={() => console.log("Button Clicked")}
        style={{ marginLeft: 20, marginBottom: 10, marginLeft: 1125 }}
      >
        Add Property
      </button>
      <SimpleGrid cols={3}>{renderPropertyItems()}</SimpleGrid>
    </div>
  );
}
