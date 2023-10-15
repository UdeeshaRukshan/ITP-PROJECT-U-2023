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

  const imageLinks =[
    "https://img.freepik.com/premium-photo/real-estate-dream-home_839035-11897.jpg?w=740",
    "https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy_1258-170466.jpg?t=st=1697359090~exp=1697362690~hmac=c4cb56de4102e8ac771e36a727ac1155f494e69734744ae8b59eebf3968b079c&w=1060",
    "https://img.freepik.com/premium-photo/house-with-pool-background_645407-34.jpg?w=740",
    "https://img.freepik.com/premium-photo/photo-modern-house-with-parked-car-driveway_822108-3919.jpg?w=740",
    "https://img.freepik.com/free-photo/relax-house-thai-style_1150-17982.jpg?w=360&t=st=1697359167~exp=1697359767~hmac=f685c1ccd14e29315ff7809a211e4d1fcf098fc42cbc2d7b5e83319847be1452",
    "https://img.freepik.com/free-photo/swimming-pool_1203-2576.jpg?w=360&t=st=1697359191~exp=1697359791~hmac=fc1a440759186825db16a2b09b0af721bad51ae57ea46205e49bc8e981a6dd3c",
    
  ];
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
    return properties.map((property,index) => (
      <div key={property._id} className="catalog-item">
        <div className="item-image">
        <img src={imageLinks[index]} alt={`property ${property._id}`} />
          {/* <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg" // Use property-specific image URL
            alt={`Property ${property._id}`}
          /> */}
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
      <Link to={"/addproperty"}>
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
          Add Property
        </button>
      </Link>
      <SimpleGrid cols={3}>{renderPropertyItems()}</SimpleGrid>
    </div>
  );
}
