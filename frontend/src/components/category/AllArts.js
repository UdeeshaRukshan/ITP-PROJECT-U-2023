import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SimpleGrid } from "@mantine/core";

import "./AllArts.css"; 

export default function AllArts() {
  
  const [arts, setArts] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
 
  const imageLinks = [
    "https://img.freepik.com/premium-photo/modern-abstract-geometry-hand-painted-beauty-background-decorative-painting_716388-1097.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://img.freepik.com/free-photo/hand-drawn-ecological-futuristic-building-concepts-generative-ai_260559-462.jpg?size=626&ext=jpg&ga=GA1.2.841406425.1697306658&semt=sph",
    "https://img.freepik.com/free-photo/eyes-sparkled-with-vibrant-colors-autumn-leaves-generative-ai_8829-2921.jpg?size=626&ext=jpg&ga=GA1.2.841406425.1697306658&semt=sph",
    "https://img.freepik.com/premium-photo/blue-grey-more-colors-abstract-painting-3d-illustration_710973-4234.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://img.freepik.com/premium-vector/abstact-expressionism-illustration-design_628782-120.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://img.freepik.com/free-vector/rare-yellow-senegal-parrot_53876-76675.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://img.freepik.com/premium-photo/modern-abstract-geometry-hand-painted-beauty-background-decorative-painting_716388-1097.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg",
    "https://img.freepik.com/free-vector/african-tribal-ethnic-pattern-template-with-minimal-logo_53876-119416.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",

    
  ];
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

  
  const renderArtItems = () => {
    return arts.map((art, index) => (
      <div key={art._id} className="catalog-item">
        <div className="item-image">
          <img src={imageLinks[index]} alt={`art ${art._id}`} />
          {/* <img
            src="https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg" // Use property-specific image URL
            alt={`art ${art._id}`}
          /> */}
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

 
  return (
    <div style={{ marginTop: 100, marginLeft: 80 }}>
      <Link to={"/addart"}>
        <button
          onClick={() => console.log("Button Clicked")}
          style={{
            marginLeft: "10px",
            marginBottom: "10px",
            backgroundColor: "#3fa34d",
            color: "white",
            padding: "20px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginLeft: 1250,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6bbf59";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#3fa34d";
          }}
        >
          Add Art
        </button>
      </Link>

      <SimpleGrid cols={3}>{renderArtItems()}</SimpleGrid>
    </div>
  );
}
