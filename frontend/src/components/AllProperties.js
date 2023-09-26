import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProperties.css"; // Import CSS file

export default function AllProperties() {
  // State to store properties data
  const [properties, setProperties] = useState([]);

  // Fetch properties data from the server
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get("http://localhost:8070/property/getproperties");
        setProperties(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchProperties();
  }, []);

  // Render properties rows
  const renderPropertiesRows = () => {
    return properties.map((property) => (
      <tr key={property._id}>
        <td>{property.address}</td>
        <td>{property.street}</td>
        <td>{property.city}</td>
        <td>{property.description}</td>
        <td>{property.value}</td>
        <td>{property.images}</td>
        <td>
        <div className="button-container">
          <button className="approve-button" onClick={() => handleApprove(property._id)}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(property._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

  // Handle "Approve" button click
  const handleApprove = (propertyId) => {
    // Add your approval logic here
    alert(`Approved Auctioneer with ID: ${propertyId}`);
  };

  // Handle "Delete" button click
  const handleDelete = (propertyId) => {
    // Add your delete logic here
    alert(`Deleted Auctioneer with ID: ${propertyId}`);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Street</th>
            <th>City</th>
            <th>Description</th>
            <th>Value</th>
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderPropertiesRows()}</tbody>
      </table>
    </div>
  );
}