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
    <div className="container">
      <form onSubmit={sendData}>

      <div className="row">
       <label htmlFor="exampleInputName" className="form-label">Full Name</label>
       <div className="col">
      <input type="text" className="form-control" placeholder="First name" aria-label="First name" required 
      onChange={(e)=>{
        setFirstName(e.target.value);
      }}/>
      <br></br>

  </div>
    <div className="col">
      <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" required 
      onChange={(e)=>{
        setLastName(e.target.value);
      }}/>
    </div>
      </div>
       <div className="mb-3">
         <label htmlFor="exampleInputEmail" className="form-label">Email Address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" required 
        onChange={(e)=>{
          setEmail(e.target.value);
        }}/>
      </div>
  <div className="mb-3">
    <label htmlFor="exampleInputNo" className="form-label">Contact Number</label>
    <input type="text" className="form-control" id="exampleInputContactNo1" placeholder="Mobile Number" required pattern="[0-9]{10}" 
    onChange={(e)=>{
      setContact(e.target.value);
    }}/>
    <small className="text-muted">Please enter a 10-digit mobile number.</small>
  </div>
  <div className="mb-3">
    <label htmlFor ="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress1" placeholder="Address" required 
    onChange={(e)=>{
      setAddress(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputStreet1" placeholder="Street/house/apartment etc." required 
    onChange={(e)=>{
      setStreet(e.target.value);
    }}/>
  </div>
  <select className="form-select" aria-label="Default select example" required
  onChange={(e)=>{
    setCity(e.target.value);
  }}>
    <option selected disabled>City</option>
    <option value="1">Colombo</option>
    <option value="2">Galle</option>
    <option value="3">Matara</option>
    <option value="4">Kandy</option>
    <option value="5">Kurunegala</option>
    <option value="6">Negambo</option>
  </select>

  <br></br>
  <div className="form-group">
          <button type="submit">Submit</button>
        </div>
</form>
    </div>
  );
    }
  