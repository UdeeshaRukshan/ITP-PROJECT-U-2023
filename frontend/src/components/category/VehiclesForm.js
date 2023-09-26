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
  const [images, setImages] = useState("");
  
function sendData(e){
  e.preventDefault();

    const newVehicle= {

      vehicleNumber,
      year,
      model,
      fuelType,
      mileage,
      features,
      location,
      value,
      images,

    }

    axios.post("http://localhost:8070/vehicle/addvehicle", newVehicle).then(() =>{
      alert("Vehicle Added");
      setVehicleNumber("");
      setYear("");
      setModel("");
      setFuelType("");
      setMileage("");
      setFeatures("");
      setLocation("");
      setValue("");
      setImages("");

    }).catch((err)=>{
        alert(err);
      });
    
    }
  
  return (
    <div className="container">

      
       <form onSubmit={sendData}>

      <h2>Vehicle Info</h2>
        <label htmlFor="vehicleNumber">Vehicle Number:</label>
        <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="e.g., ABC-2056" required
        onChange={(e) =>{
          setVehicleNumber(e.target.value);
        }}/><br></br>

        <div className="row">
          <div className="col">
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" name="model" placeholder="e.g., Honda Civic" required
            onChange={(e) =>{
              setYear(e.target.value);
            }}/><br></br>
          </div>
          <div className="col">
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
          /><br></br>
          </div>

        </div>

        <div className="row">
  <div className="col">
    <label htmlFor="fuelType">Fuel Type:</label>
    <select className="form-select" aria-label="Default select example" required
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
  <div className="col">
       <label htmlFor="mileage">Mileage:</label>
       <input type="number" id="mileage" name="mileage" placeholder="e.g., 3200" required
         onChange={(e) => {
          const inputMileage = e.target.value;
          if (inputMileage > 0) {
          setMileage(inputMileage);
          } else {
          alert("Must enter valid mileage");
        }
        }}
       />

  </div>
    </div>

        <label htmlFor="features">Features:</label>
        <textarea id="features" name="features" placeholder="Mention the condition of your vehicle." required
        onChange={(e) =>{
          setFeatures(e.target.value);
        }}></textarea><br></br>

        <label htmlFor="location">Location:</label>
        <select class="form-select" id="location" name="location" required 
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
        </select><br />

        <label htmlFor="openingValue">Opening Value:(Rs)</label>
           <input type="number" id="openingvalue" name="openingvalue" placeholder="e.g., 75lakhs" required
             onChange={(e) => {
              const inputOpeningValue = e.target.value;
               if (inputOpeningValue > 0) {
                setValue(inputOpeningValue);
                } else {
                alert("Must enter valid value");
                }
            }}/>

         <label htmlFor="images">Images:(Please add at least 6 photos of the interior and exterior of the vehicle) </label>
           <input type="file" id="images" name="images" accept="image/*" multiple required
             onChange={(e) => {
              const selectedFiles = e.target.files;
                if (selectedFiles.length < 6) {
                 // Display an alert for fewer than 6 photos
                 alert("At least 6 photos are required.");
                 // Clear the input to prevent invalid selections
                 e.target.value = null;
                } else if (selectedFiles.length > 10) {
                // Display an alert for more than 10 photos
                alert("You can only add upto 10 photos.");
                // Limit the selection to the first 10 photos
                setImages(Array.from(selectedFiles).slice(0, 10));
                } else {
                setImages(selectedFiles);
                }
                }}
               /><br></br>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
  }

export default VehicleForm;
