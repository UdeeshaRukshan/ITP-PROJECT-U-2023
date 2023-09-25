import React, { useState } from "react";
import axios from "axios";
import "./VehicleForm.css"; // Create a CSS file for styling if needed

function VehicleForm() {
  // State variables for personal details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  // State variables for vehicle details
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

    if (images.length < 6) {
      alert("Please upload at least 6 photos of the interior and exterior of the vehicle.");
      return; // Stop form submission
    }

    // Combine personal and vehicle details into one object
    const data = {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      street,
      city,
      vehicleNumber,
      year,
      model,
      fuelType,
      mileage,
      features,
      location,
      value,
      images,
    };

    // Send data to the server
    axios
      .post("http://localhost:8070/auctioneer/add", data)
      .then(() => {
        alert("Data Added to Auctioneer");
        // Reset all the form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setContactNumber("");
        setAddress("");
        setStreet("");
        setCity("");
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

  return (
    <div className="container">
      <form onSubmit={sendData}>
        {/* Personal Details Section */}
        <h2>Personal Details</h2>
        <div className="row">
          <div className="col">
            <label htmlFor="firstName">First Name:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="First name" 
              aria-label="First name" 
              required 
              onChange={(e)=>{setFirstName(e.target.value);
              }}/>
          </div>
          <div className="col">
            <label htmlFor="lastName">Last Name:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Last name" 
              aria-label="Last name" 
              required 
              onChange={(e)=>{setLastName(e.target.value);
              }}/>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            placeholder="Email" 
            required 
            onChange={(e)=>{setEmail(e.target.value);
            }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input 
            type="text" 
            className="form-control" 
            id="exampleInputContactNo1" 
            placeholder="Mobile Number" 
            required pattern="[0-9]{10}" 
            onChange={(e)=>{setContactNumber(e.target.value);
            }}/>
            <small className="text-muted">Please enter a 10-digit mobile number.</small>
        </div>
        <div className="mb-3">
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            className="form-control" 
            id="exampleInputAddress1" 
            placeholder="Address" 
            required 
            onChange={(e)=>{setAddress(e.target.value);
            }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="street">Street/House/Apartment:</label>
          <input 
            type="text" 
            className="form-control" 
            id="exampleInputStreet1" 
            placeholder="Street/house/apartment etc." 
            required 
            onChange={(e)=>{setStreet(e.target.value);
            }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="city">City:</label>
          <select 
            className="form-select" 
            aria-label="Default select example" 
            required
            onChange={(e)=>{setCity(e.target.value);
            }}>
            <option value="">Select City</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Kandy">Kandy</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Negambo">Negambo</option>
          </select>
        </div>

        {/* Vehicle Details Section */}
        <h2>Vehicle Info</h2>
        <div className="mb-3">
          <label htmlFor="vehicleNumber">Vehicle Number:</label>
          <input 
            type="text" 
            id="vehicleNumber" 
            className="vehicleNumber" 
            placeholder="e.g., ABC-2056" 
            required
            onChange={(e) =>{setVehicleNumber(e.target.value);
            }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="year">Manufacture Year:</label>
          <input 
            type="number" 
            id="year" 
            name="year" 
            min="1900" // Set the minimum year to allow
            max="2099" // Set the maximum year to allow
            step="1"    // Set the step to 1 to allow whole numbers only
            required
          onChange={(e) => {
          setModel(e.target.value);
          }}
          />
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="model">Model:</label>
            <input 
              type="text" 
              id="model" 
              name="model" 
              placeholder="e.g., Honda Civic" 
              required
              onChange={(e) =>{
              setYear(e.target.value);
            }}/>
          </div>
          <div className="col">
            <label htmlFor="fuelType">Fuel Type:</label>
            <select 
            className="form-select" 
            aria-label="Default select example" 
            required
            onChange={(e) =>{
            setFuelType(e.target.value);
          }}>
             <option value="">Select Fuel Type</option>
             <option value="Petrol">Petrol</option>
             <option value="Diesel">Diesel</option>
             <option value="Electric">Electric</option>
             <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="mileage">Mileage:</label>
            <input 
            type="number" 
            id="mileage" 
            name="mileage" 
            placeholder="e.g., 3200" 
            required
            onChange={(e) =>{
            setMileage(e.target.value);
          }}/>
          </div>
          <div className="col">
            <label htmlFor="value">Opening Value (Rs):</label>
            <input 
              type="number" 
              id="openingValue" 
              name="openingValue" 
              placeholder="e.g., 60lakhs" 
              required
              onChange={(e) =>{
              setValue(e.target.value);
            }}/>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="features">Features:</label>
          <textarea 
            id="features" 
            name="features" 
            placeholder="Mention the condition of your vehicle." 
            required
            onChange={(e) =>{
            setFeatures(e.target.value);
          }}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="location">Location:</label>
          <select 
            class="form-select" 
            id="location" 
            name="location" 
            required 
            onChange={(e) =>{
            setLocation(e.target.value);
          }}>
          <option value="">Select Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Kaduwela">Kaduwela</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Anuradhapura">Anuradhapura</option>
        </select>
        </div>
        <div className="mb-3">
          <label htmlFor="images">Images (Please add at least 6 photos of the interior and exterior of the vehicle):</label>
          <input 
            type="file" 
            id="images" 
            name="images" 
            accept="image/*" 
            multiple required
            onChange={(e) =>{
            setImages(e.target.value);
          }}/>
        </div>

        <div className="button-container">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;
