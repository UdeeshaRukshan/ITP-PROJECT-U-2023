import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./AllProperties.css"; 
import jsPDF from 'jspdf';

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const generateReportForProperty = (property) => {
    const doc = new jsPDF();
    doc.text(`Property Report - ${property.title}`, 10, 10);<br></br>
    doc.text(`Property City: ${property.title}`, 10, 30);<br></br>
    doc.text(`Address: ${property.medium}`, 10, 40);<br></br>
    doc.text(`Street: ${property.height}`, 10, 50);<br></br>
    doc.text(`City: ${property.width}`, 10, 60);<br></br>
    doc.text(`Description: ${property.condition}`, 10, 70);<br></br>
    doc.text(`Value ($): ${property.value}`, 10, 80);

    doc.save(`${property.title}_report.pdf`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image.dataUrl}
        alt={`Property ${index + 1}`}
      />
    ));
  };

  const renderPropertiesRows = () => {
    const filteredProperties = properties.filter((property) =>
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredProperties.map((property) => (
      <tr key={property._id}>
        <td>{property.address}</td>
        <td>{property.street}</td>
        <td>{property.city}</td>
        <td>{property.description}</td>
        <td>{property.value}</td>
        <td>{renderImages(property.images)}</td>
        <td>
          <Link to={`/updateproperty/${property._id}`}>
            <button className="all-prop-edit-button">Edit</button>
          </Link>
          <button className="delete-button-allprop" onClick={() => handleDeleteClick(property._id)}>
            Delete
          </button>
          <button className="all-prop-generate-report-button" onClick={() => generateReportForProperty(property)}>
            Generate Report
          </button>
        
      </td>
      </tr>
    ));
  };

  
  return (
    <div className="all-prop-container">
      <h2 className="all-prop-header">All Properties</h2>
      <div className="all-prop-search-container">
        <input
          type="text"
          placeholder="Search by city of the properties"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="all-prop-table">
        <thead className="all-prop-thread">
          <tr className="tr-all-prop">
            <th className="all-prop-th">Address</th>
            <th className="all-prop-th">Street</th>
            <th className="all-prop-th">City</th>
            <th className="all-prop-th">Description</th>
            <th className="all-prop-th">Value($)</th>
            <th className="all-prop-th">Images</th> 
            <th className="all-prop-th">Actions</th>
          </tr>
        </thead>
        <tbody className="all-prop-tbody">{renderPropertiesRows()}</tbody>
      </table>
    </div>
  );
}
