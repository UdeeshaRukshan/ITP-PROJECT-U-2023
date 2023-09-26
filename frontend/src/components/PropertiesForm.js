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
  

  function sendData(e){
    e.preventDefault();

    const newProperty= {

      address,
      street,
      city,
      description,
      value,
      images,
    }

    axios.post("http://localhost:8070/property/addproperty", newProperty).then(()=> {
      alert("Property Added");
      setAddress("");
      setDescription("");
      setValue("");
      setImages("");

    }).catch((err)=>{
      alert(err);
    });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
      <h2>Tell Us About Your Property</h2>
      <h6 className="bold-header">Property Location</h6>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          required
          onChange={(e) =>{
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
          onChange={(e) =>{
            setStreet(e.target.value);
          }}
        />

<label htmlFor="city">City:</label>
        <select class="form-select"
          id="city"
          name="city"
          required
          onChange={(e) =>{
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
        </select><br />

        <label htmlFor="description">Give a description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Located on the riverside.A modern two story house.Five bedrooms with attached bathrooms."
          required
          onChange={(e) =>{
            setDescription(e.target.value);
          }}
        ></textarea>

        <label htmlFor="openingValue">Set a opening value to auction your property:(Rs)</label>
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
            }}/>

<label htmlFor="images">Images (multiple):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          required
          onChange={(e) =>{
            setImages(e.target.value);
          }}/>

         <button type="submit">Submit</button>
         
      </form>
    </div>
  );
}

export default PropertyForm;
