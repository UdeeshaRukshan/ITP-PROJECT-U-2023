import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAuctioneers.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { SimpleGrid } from "@mantine/core";
export default function AllCollectables() {
  // State to store auctioneer data
  const [collectables, setcollectables] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const handleAddToWishlist = async (collectableId) => {
    //     console.log(artId);
    try {
      const response = await axios.post(
        "http://localhost:4042/api/add-to-wishlist",
        { itemId: collectableId },
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
  // Fetch auctioneer data from the server
  useEffect(() => {
    async function fetchCollectables() {
      try {
        const response = await axios.get(
          "http://localhost:4042/collectable/getcollectables"
        );
        setcollectables(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchCollectables();
  }, []);

  // Render auctioneer items in a catalog-like box
  const renderCollectableItems = () => {
    return collectables.map((collectable) => (
      <div key={collectable._id} className="catalog-item">
        <div className="item-image">
          <img
            src="https://m.media-amazon.com/images/I/81SDCMipR-L.jpg" // Use property-specific image URL
            alt={`art ${collectable._id}`}
          />
        </div>
        <div className="item-details">
          <h3>{collectable.name}</h3>
          <p className="price">${collectable.value}</p> {/* Add price */}
        </div>
        <div className="item-actions">
          <Link
            to={`/collectables/${collectable._id}`}
            className="view-details-button"
            style={{ fontSize: 10 }}
          >
            View Details
          </Link>
          <button
            className="view-details-button"
            onClick={() => handleAddToWishlist(collectable._id)}
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
      <Link to={"/addcollectable"}>
        <button
          onClick={() => console.log("Button Clicked")}
          style={{ marginLeft: 20, marginBottom: 10, marginLeft: 1125 }}
        >
          Add Collectable
        </button>
      </Link>
      <SimpleGrid cols={3}>{renderCollectableItems()}</SimpleGrid>
    </div>
  );
}
