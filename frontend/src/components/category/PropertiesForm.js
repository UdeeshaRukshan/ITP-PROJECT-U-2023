import React, { useState } from "react";
import axios from "axios";
import "./Properties.css";

function PropertyForm() {
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newProperty = {
      address,
      street,
      city,
      description,
      value,
      images,
    };

    axios
      .post("http://localhost:4042/property/addproperty", newProperty)
      .then(() => {
        alert("Property Added");
        setAddress("");
        setDescription("");
        setValue("");
        setImages("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
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

        <label htmlFor="openingValue">Opening Value:(Rs)</label>
        <input
          type="number"
          id="openingvalue"
          name="openingvalue"
          placeholder="e.g., 75lakhs"
          required
          onChange={(e) => {
            const inputOpeningValue = e.target.value;
            if (inputOpeningValue > 0) {
              setValue(inputOpeningValue);
            } else {
              alert("Must enter valid value");
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
