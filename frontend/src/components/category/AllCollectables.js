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
    "https://img.freepik.com/premium-photo/ornate-wood-leather-chair-photo-frame-white-background_899449-21698.jpg?w=740",
    "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    "https://img.freepik.com/premium-photo/gold-wedding-ring-illustration-generative-ai_115919-6696.jpg?w=740",
    "https://img.freepik.com/premium-photo/photo-gundam-robot-with-latest-variations-wallpaper_947926-1649.jpg",
    "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    "https://img.freepik.com/premium-photo/vintage-lighting-table-lamp-with-antique-charm-elegance_941761-3910.jpg?w=740",
    "https://images.unsplash.com/photo-1677804418426-be788c0be43f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    


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
