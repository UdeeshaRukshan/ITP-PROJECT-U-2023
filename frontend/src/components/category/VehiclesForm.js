import React, { useState } from "react";
import axios from "axios";
import "./VehicleForm.css";

function VehicleForm() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [features, setFeatures] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);

  function sendData(e) {
    e.preventDefault();

    if (images.length < 6 || images.length > 10) {
      alert("Please select between 6 and 10 images.");
      return;
    }

    const formData = new FormData();

    // Append each image file to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Append other fields to the FormData object
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("year", year);
    formData.append("model", model);
    formData.append("fuelType", fuelType);
    formData.append("mileage", mileage);
    formData.append("features", features);
    formData.append("location", location);
    formData.append("value", value);

    axios
      .post("http://localhost:4042/vehicle/addvehicle", formData)
      .then(() => {
        alert("Your Vehicle Added ");
        setVehicleNumber("");
        setYear("");
        setModel("");
        setFuelType("");
        setMileage("");
        setFeatures("");
        setLocation("");
        setValue("");
        setImages([]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleImageChange(e) {
    const selectedImages = e.target.files;
    if (selectedImages.length >= 6 && selectedImages.length <= 10) {
      // Validate image types
      for (let i = 0; i < selectedImages.length; i++) {
        const fileType = selectedImages[i].type;
        if (fileType !== "image/jpeg" && fileType !== "image/png") {
          alert("Please select only JPEG and PNG images.");
          e.target.value = null; // Clear the file input
          return;
        }
      }

      // Update the images state if the number and types of selected images are valid.
      setImages([...selectedImages]);
    } else {
      alert("Please select between 6 to 10 images.");
      e.target.value = null; // Clear the file input
    }
  }

  return (
    <div className="vehicle-form-container">
      <form onSubmit={sendData}>
        <h2 className="vehicle-form-title">Tell Us About Your Vehicle</h2>

        <label className="vehicle-form-label" htmlFor="title">
          Vehicle Number:
        </label>
        <input
          type="text"
          id="vehicleNumber"
          className="vehicle-form-input"
          placeholder="e.g., ABC-2056"
          required
          onChange={(e) => {
            setVehicleNumber(e.target.value);
          }}
        />
        <br></br>

        <div className="row">
          <div className="col">
            <label className="vehicle-form-label" htmlFor="model">
              {" "}
              Vehicle Model:
            </label>
            <input
              type="text"
              id="model"
              className="vehicle-form-input"
              placeholder="e.g., Honda Civic"
              required
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
            <br></br>
          </div>
          <div className="col">
            <label className="vehicle-form-label" htmlFor="year">
              Manufacture Year:
            </label>
            <input
              type="number"
              id="year"
              className="vehicle-form-input"
              min="1900" // Set the minimum year to allow
              max="2099" // Set the maximum year to allow
              step="1" // Set the step to 1 to allow whole numbers only
              placeholder="e.g., 2000"
              required
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <br></br>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="vehicle-form-label" htmlFor="fuelType">
              Fuel Type:
            </label>
            <select
              className="vehicle-form-select"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setFuelType(e.target.value);
              }}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="col">
            <label className="vehicle-form-label" htmlFor="mileage">
              Mileage:(In killometers)
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              className="vehicle-form-input"
              placeholder="e.g., 3200"
              required
              onChange={(e) => {
                const inputMileage = e.target.value;
                if (inputMileage > 0) {
                  setMileage(inputMileage);
                } else {
                  alert("Must enter valid value");
                }
              }}
            />
          </div>
        </div>

        <label className="vehicle-form-label" htmlFor="title">
          Features:
        </label>
        <textarea
          id="features"
          className="vehicle-form-textarea"
          placeholder="Mention the condition of your vehicle. "
          required
          onChange={(e) => {
            setFeatures(e.target.value);
          }}
        ></textarea>
        <br></br>

        <label className="vehicle-form-label" htmlFor="location">
          Where is this vehicle located:
        </label>
        <select
          className="vehicle-form-select"
          id="location"
          required
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        >
          <option value="">Select Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select>
        <br />

        <label className="vehicle-form-label" htmlFor="openingValue">
          Set a opening value to auction your vehicle:($)
        </label>
        <input
          type="number"
          id="openingValue"
          className="vehicle-form-input"
          placeholder="e.g., 6000"
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
        <br />

        <label className="vehicle-form-label" htmlFor="image">
          Images:(Please add at least 6 photos of the interior and exterior of
          the vehicle)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          required
          onChange={handleImageChange}
        />
        <br></br>

        {images.map((image, index) => (
          <div key={index}>
            <img
              className="vehicle-form-image-preview"
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
            />
          </div>
        ))}

        <button type="submit" className="vehicle-form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;
