import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AllProperties.css"; // Import CSS file

export default function AllProperties() {
  // State to store properties data
  const [properties, setProperties] = useState([]);

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
        <div className="item-details">
          {/* Display the property address */}
          <h3>{property.address}</h3>

          {/* Display the property description */}
        </div>
        <div className="item-image">
          {/* Display the property images */}
          {property.images.map((image, index) => (
            <img
              key={index}
              src={`${image.path}`}
              alt={`Property Image ${image.path}`}
            />
          ))}
        </div>
        <div className="item-actions">
          <Link to={`/property/${property._id}`} className="detail-link">
            View Details
          </Link>
        </div>
      </div>
    ));
  };

  // Return the JSX for rendering
  return <div className="catalog-container">{renderPropertyItems()}</div>;
}
