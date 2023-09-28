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
          {/* Customize the content inside the catalog item as needed */}
          <h3>{property.address}</h3>
          <p>{property.description}</p>
        </div>
        <div className="item-actions">
          {/* Use Link component to navigate to property item page */}
          <Link to={`/property/${property._id}`} className="detail-link">
            View Details
          </Link>
        </div>
      </div>
    ));
  };

  // Handle "Approve" button click
  const handleApprove = (propertyId) => {
    // Add your approval logic here
    alert(`Approved Property with ID: ${propertyId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (propertyId) => {
    // Add your delete logic here
    alert(`Deleted Property with ID: ${propertyId}`);
  };

  return <div className="catalog-container">{renderPropertyItems()}</div>;
}
