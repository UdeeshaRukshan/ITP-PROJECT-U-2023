import React, { useState } from "react";
import axios from "axios";
import "./PropertiesForm.css";

function PropertyForm() {
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (images.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const newProperty = {
      address,
      street,
      city,
      description,
      value,
      images,
    };

    axios
      .post("http://localhost:8070/property/addproperty", newProperty)
      .then(() => {
        alert("Property Added");
        setAddress("");
        setStreet("");
        setCity("");
        setDescription("");
        setValue("");
        setImages("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleImageChange(e) {
    const selectedImages = e.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      imageArray.push(URL.createObjectURL(selectedImages[i]));
    }

    setImages(imageArray);
  }

  return (
    <div className="property-form-container">
      <form onSubmit={sendData}>
        <h2 className="property-form-title">Tell Us About Your Property</h2>
        <h6 className="bold-header">Property Location</h6>
        <label className="property-form-label" htmlFor="address">
          Address:
        </label>
        <input
          type="text"
          id="address"
          className="property-form-input"
          placeholder="Address"
          required
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <label className="property-form-label" htmlFor="street">
          Street:
        </label>
        <input
          type="text"
          id="street"
          className="property-form-input"
          placeholder="Street/house/apartment etc."
          required
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />

        <label className="property-form-label" htmlFor="city">
          City:
        </label>
        <select
          id="city"
          className="property-form-select"
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

        <label className="property-form-label" htmlFor="description">
          Give a description:
        </label>
        <textarea
          id="description"
          className="property-form-textarea"
          placeholder="e.g., Located on the riverside.A modern two story house.Five bedrooms with attached bathrooms."
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>

        <label className="property-form-label" htmlFor="openingValue">
          Set a opening value to auction your property:($)
        </label>
        <input
          type="number"
          id="openingvalue"
          className="property-form-input"
          placeholder="e.g., 75000"
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

        <label className="property-form-label" htmlFor="images">
          Images (up to 10):
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          required
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />

        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            {images.map((image, index) => (
              <img
                key={index}
                className="art-form-image-preview"
                src={image}
                alt={`Image ${index}`}
              />
            ))}
          </div>
        )}

        <button type="submit" className="property-form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PropertyForm;
