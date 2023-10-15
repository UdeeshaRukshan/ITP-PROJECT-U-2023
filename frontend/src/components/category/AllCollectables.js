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

  const imageLinks =[
    "https://img.freepik.com/premium-photo/cartoony-3d-printed-witch-with-hat-dark-silver_899449-52124.jpg?w=740",
    "https://img.freepik.com/premium-photo/cartoony-3d-printed-witch-with-hat-dark-silver_899449-52124.jpg?w=740",
    "https://img.freepik.com/premium-photo/gold-wedding-ring-illustration-generative-ai_115919-6696.jpg?w=740",
    "https://img.freepik.com/free-photo/group-stuffed-bears-are-sitting-front-blue-wall_1340-35253.jpg?t=st=1697354476~exp=1697358076~hmac=67434c22e5110b182931ee21c5f362f20e9c63f66f65284f108dd99d9d5bc2da&w=360",
    "https://img.freepik.com/premium-vector/abstact-expressionism-illustration-design_628782-120.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    "https://img.freepik.com/free-vector/rare-yellow-senegal-parrot_53876-76675.jpg?size=626&ext=jpg&ga=GA1.1.841406425.1697306658&semt=sph",
    


  ];
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
    return collectables.map((collectable,index) => (
      <div key={collectable._id} className="catalog-item">
        <div className="item-image">
        <img src={imageLinks[index]} alt={`collectable ${collectable._id}`} />
          {/* <img
            src="https://m.media-amazon.com/images/I/81SDCMipR-L.jpg" // Use property-specific image URL
            alt={`art ${collectable._id}`}
          /> */}
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
          Add Collectable
        </button>
      </Link>
      <SimpleGrid cols={3}>{renderCollectableItems()}</SimpleGrid>
    </div>
  );
}
