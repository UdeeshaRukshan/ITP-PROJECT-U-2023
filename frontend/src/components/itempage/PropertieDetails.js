import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PropertieDetails.css";

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4042/property/getproperty/${propertyId}`)
      .then((response) => {
        console.log(response.data);
        setProperty(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [propertyId]); // Include propertyId in the dependency array to fetch data when it changes

  return (
    <div className="property-details">
      <h2>Property Details</h2>

      {loading ? (
        <p>Loading property details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
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
      )}
    </div>
  );
}
