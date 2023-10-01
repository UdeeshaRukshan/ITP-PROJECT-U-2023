import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProperties.css"; 

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

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image.dataUrl}
        alt={`Property ${index + 1}`}
      />
    ));
  };

  // Render properties rows
  const renderPropertiesRows = () => {
    return properties.map((property) => (
      <tr key={property._id}>
        <td>{property.address}</td>
        <td>{property.street}</td>
        <td>{property.city}</td>
        <td>{property.description}</td>
        <td>{property.value}</td>
        <td>{renderImages(property.images)}</td>
        <td>
        <div className="all-prop-button-container">
          <button className="all-prop-delete-button" onClick={() => handleDeleteClick(property._id)}>
            Delete
          </button>
        </div>
      </td>
      </tr>
    ));
  };

   // Function to handle delete button click
   const handleDeleteClick = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/property/deleteproperty/${propertyId}`);

        setProperties((prevProperty) => prevProperty.filter((property) => property._id !== propertyId));
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="all-prop-container">
      <table className="all-prop-table">
        <thead className="all-prop-thead">
          <tr>
            <th>Address</th>
            <th>Street</th>
            <th>City</th>
            <th>Description</th>
            <th>Value($)</th>
            <th>Images</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderPropertiesRows()}</tbody>
      </table>
    </div>
  );
}