import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SimpleGrid } from "@mantine/core";

import "./AllArts.css"; // Import your CSS file

export default function AllArts() {
  // State to store art data
  const [arts, setArts] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  // Fetch art data from the server
  useEffect(() => {
    async function fetchArts() {
      try {
        const response = await axios.get("http://localhost:4042/art/getarts");
        setArts(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArts();
  }, []);
  const handleAddToWishlist = async (artId) => {
    console.log(artId);

    try {
      const response = await axios.post(
        "http://localhost:4042/api/add-to-wishlist",
        { itemId: artId },
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

  // Render art items
  const renderArtItems = () => {
    return arts.map((art) => (
      <div key={art._id} className="catalog-item">
        <div className="item-image">
          <img
            src="https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg" // Use property-specific image URL
            alt={`art ${art._id}`}
          />
        </div>
        <div className="item-details">
          <h3>{art.title}</h3>
          <p className="price">${art.value}</p> {/* Add price */}
        </div>
        <div className="item-actions">
          <Link
            to={`/art/${art._id}`}
            className="view-details-button"
            style={{ fontSize: 10 }}
          >
            View Details
          </Link>
          <button
            className="view-details-button"
            onClick={() => handleAddToWishlist(art._id)}
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
        Add Art
      </button>
      <SimpleGrid cols={3}>{renderArtItems()}</SimpleGrid>
    </div>
  );
}
