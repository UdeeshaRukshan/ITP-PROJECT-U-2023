import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PropertieDetails.css";

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4042/property/getproperty/${propertyId}`)
      .then((response) => {
        setProperty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [propertyId]);

  return (
    <div className="property-details">
      <h2>Property Details</h2>
      {loading ? (
        <p>Loading property details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="details">
          <PropertyDetail label="Property ID" value={property._id} />
          <PropertyDetail label="Address" value={property.address} />
          <PropertyDetail label="Description" value={property.description} />
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

function PropertyDetail({ label, value }) {
  return (
    <div className="detail">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  );
}
