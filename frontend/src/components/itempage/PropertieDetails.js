import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PropertieDetails.css";

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "/http://localhost:4042//add-to-wishlist",
        {
          // name: name,
          // itemid: itemid,
        }
      );

      if (response.status === 200) {
        setMessage("Item added to wishlist successfully.");
      } else {
        setMessage("Error adding item to wishlist.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };
  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await axios.get(
          `http://localhost:4042/property/getproperty/${propertyId}`
        );
        setProperty(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  return (
    <div className="property-details">
      <h2>Property Details</h2>
      {loading && <p>Loading property details...</p>}
      {error && <p>Error: {error}</p>}
      {property && (
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
      <span className="value">{value}:</span>
    </div>
  );
}
