import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllProperties.css";

function PropertyForm() {
  // State to store properties data
  const [properties, setProperties] = useState([]);

  // State for property form data
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);

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

  // Function to handle property form submission
  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("address", address);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("description", description);
    formData.append("value", value);

    // Append all selected image files
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:4042/property/addproperty",
        formData
      );
      alert("Property Added");
      setAddress("");
      setDescription("");
      setValue("");
      setImages([]);
    } catch (error) {
      alert(error.message);
    }
  };

  // Render property items in a catalog-like box
  const renderPropertyItems = () => {
    return properties.map((property) => (
      <div key={property._id} className="catalog-item">
        <div className="item-details">
          <h3>{property.address}</h3>
        </div>
        <div className="item-actions">
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

  return (
    <div className="container">
      <form className="form-prop" onSubmit={sendData}>
        <h2>Add a New Property</h2>
        <h6 className="bold-header">Property Address</h6>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          required
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Street/house/apartment etc."
          required
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />

        <label htmlFor="city">City:</label>
        <select
          class="form-select"
          id="city"
          name="city"
          required
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="">Select City</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select>
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Property description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>

        <label htmlFor="openingValue">Opening Value (Rs):</label>
        <input
          type="number"
          id="openingvalue"
          name="openingvalue"
          placeholder="e.g., 75 lakhs"
          required
          onChange={(e) => {
            const inputOpeningValue = e.target.value;
            if (!isNaN(inputOpeningValue) && inputOpeningValue > 0) {
              setValue(inputOpeningValue);
            } else {
              alert("Please enter a valid positive number.");
            }
          }}
        />

        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          required
          onChange={(e) => {
            const selectedFiles = e.target.files;

            if (selectedFiles.length <= 10) {
              setImages(selectedFiles);
            } else {
              alert("You can only add up to 10 photos.");
              e.target.value = null;
            }
          }}
        />

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
