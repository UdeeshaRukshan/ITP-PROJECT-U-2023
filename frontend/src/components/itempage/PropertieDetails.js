import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PropertieDetails.css";
export default function PropertyDetails() {
  // Get the property ID from the URL using useParams
  const { propertyId } = useParams();

  // State to store property details
  const [property, setProperty] = useState([]);

  // Fetch property details from the server based on the propertyId
  useEffect(() => {
    async function fetchPropertyDetails() {
      try {
        const response = await axios.get(
          `http://localhost:4042/property/getproperty/${propertyId}`
        );
        setProperty(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchPropertyDetails();
  }, [propertyId]);

  return (
    <div className="property-details">
      <h2>Property Details</h2>

      {property ? (
        <div className="details">
          <div className="detail">
            <span className="label">Property ID:</span>
            <span className="value">{property._id}</span>
          </div>
          <div className="detail">
            <span className="label">Address:</span>
            <span className="value">{property.address}</span>
          </div>
          <div className="detail">
            <span className="label">Description:</span>
            <span className="value">{property.description}</span>
          </div>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
}
