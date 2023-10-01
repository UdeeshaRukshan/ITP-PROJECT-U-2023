import React, { useState } from "react";
import axios from "axios";
import "./PersonalDetails.css";


export default function PersonalDetails() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [contactNumber,setContact] = useState("");
  const [address,setAddress] = useState("");
  const [street,setStreet] = useState("");
  const [city,setCity] = useState("");

  function sendData(e) { 
    e.preventDefault();

    const newAuction = {
       
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      street,
      city
    }

    axios.post("http://localhost:8070/auctioneer/add", newAuction).then(()=>{
      alert("Details Added");
      setFirstName("");
      setLastName("");
      setEmail("");
      setContact("");
      setAddress("");
      setStreet("");
      setCity("");

    }).catch((err)=>{
      alert(err);
    });
  
  }

  return (
    <div className="user-form-container">
      <form onSubmit={sendData}>

      <div className="row">
       <label htmlFor="exampleInputName" className="user-form-label">Full Name</label>
       <div className="col">
      <input type="text" className="user-form-input" placeholder="First name" aria-label="First name" required 
      onChange={(e)=>{
        setFirstName(e.target.value);
      }}/>
      <br></br>

  </div>
    <div className="col">
      <input type="text" className="user-form-input" placeholder="Last name" aria-label="Last name" required 
      onChange={(e)=>{
        setLastName(e.target.value);
      }}/>
    </div>
      </div>
       <div className="mb-3">
         <label htmlFor="exampleInputEmail" className="user-form-label">Email Address</label>
        <input type="email" className="user-form-input" id="exampleInputEmail1" placeholder="Email" required 
        onChange={(e)=>{
          setEmail(e.target.value);
        }}/>
      </div>
  <div className="mb-3">
    <label htmlFor="exampleInputNo" className="user-form-label">Contact Number</label>
    <input type="tel" className="user-form-input" id="exampleInputContactNo1" placeholder="Mobile Number" required pattern="[0-9]{10}" 
    onChange={(e)=>{
      if (/^[0-9]{10}$/.test(e.target.value)) {
      setContact(e.target.value);
      }
    }}/>
    <small className="text-muted">Please enter a 10-digit mobile number.</small>
  </div>
  <div className="mb-3">
    <label htmlFor ="exampleInputAddress" className="user-form-label">Address</label>
    <input type="text" className="user-form-input" id="exampleInputAddress1" placeholder="Address" required 
    onChange={(e)=>{
      setAddress(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <input type="text" className="user-form-input" id="exampleInputStreet1" placeholder="Street/house/apartment etc." required 
    onChange={(e)=>{
      setStreet(e.target.value);
    }}/>
  </div>
  <select className="user-form-input" aria-label="Default select example" required
  onChange={(e)=>{
    setCity(e.target.value);
  }}>
    <option value="">City</option>
    <option value="Colombo">Colombo</option>
    <option value="Galle">Galle</option>
    <option value="Matara">Matara</option>
    <option value="Kandy">Kandy</option>
    <option value="Kurunegala">Kurunegala</option>
    <option value="Negambo">Negambo</option>
  </select>

  <br></br>

  <button type="submit" className="user-form-button">
          Submit
        </button>
    </form>
    </div>
  );
    }
  
