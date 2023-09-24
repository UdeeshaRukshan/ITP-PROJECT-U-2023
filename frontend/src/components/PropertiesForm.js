import React, { useState } from "react";

function PropertyForm() {
  const [propertyData, setPropertyData] = useState({
    address: "",
    street: "",
    city: "",
    description: "",
    openingValue: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "openingValue" && (parseFloat(value) <= 0 || isNaN(parseFloat(value)))) {
      setPropertyData({
        ...propertyData,
        [name]: "",
      });
    } else {
      setPropertyData({
        ...propertyData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setPropertyData({
      ...propertyData,
      images: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Property data:", propertyData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <h2>Add a New Property</h2>
      <h6 className="bold-header">Property Address</h6>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={propertyData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Street/house/apartment etc."
          value={propertyData.street}
          onChange={handleChange}
          required
        />

<label htmlFor="city">City:</label>
        <select class="form-select"
          id="city"
          name="city"
          value={propertyData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select><br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Property description"
          value={propertyData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="openingValue">Opening Value (Rs):</label>
        <input
          type="text"
          id="openingValue"
          name="openingValue"
          placeholder="e.g., 2.8 lakhs"
          value={propertyData.openingValue}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />

       <div className="row justify-content-center">
          {/* Center the buttons within a row */}
          <div className="col-auto">
            <button type="button" className="btn btn-secondary btn-lg">Back</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
