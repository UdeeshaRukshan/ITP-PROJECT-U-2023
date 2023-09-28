import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  // Get the property ID from the URL using useParams
  const { propertyId } = useParams();

  // State to store property details
  const [property, setProperty] = useState(null);

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
    <div>
      <h2>Property Details</h2>

      {property ? (
        <div>
          <p>Property ID: {property._id}</p>
          <p>Address: {property.address}</p>
          <p>Description: {property.description}</p>
          {/* Display other property details here */}
        </div>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
}
