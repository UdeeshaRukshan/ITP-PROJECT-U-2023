<<<<<<< HEAD
import React, { useState } from "react";
import "../App.css";
=======
import React,{useState} from "react";
import axios from "axios";

>>>>>>> a5d92b3be39d487aea93ac5d11ca1af1ef1cb4bc
export default function PersonalDetails() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [contactNumber,setContactNumber]= useState("");
  const [address,setAddress]=useState("");
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

    axios.post("http:/localhost:8070/Auctioneer/add", newAuction).then(()=>{
      alert("Auction Added")
    }).catch((err)=>{
      alert(err)
    })
   
  return (
<<<<<<< HEAD
    <div className="container">
      <form>
        <div class="row">
          <label for="exampleInputName" class="form-label">
            Full Name
          </label>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              aria-label="First name"
              required
            />
            <br></br>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              aria-label="Last name"
              required
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail" class="form-label">
            Email Address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputNo" class="form-label">
            Contact Number
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputContactNo1"
            placeholder="Mobile Number"
            required
            pattern="[0-9]{10}"
          />
          <small class="text-muted">
            Please enter a 10-digit mobile number.
          </small>
        </div>
        <div class="mb-3">
          <label for="exampleInputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputAddress1"
            placeholder="Address"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="exampleInputStreet1"
            placeholder="Street/house/apartment etc."
            required
          />
        </div>
        <select
          class="form-select"
          aria-label="Default select example"
          required
        >
          <option selected disabled>
            Open this select menu
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
=======

    <div className="container">   
     <h3>Your Info</h3>
     <hr></hr>

      <form onSubmit={sendData}>
      <div className="row">
      <label htmlFor="exampleInputName" className="form-label">Full Name</label>
       <div className="col">
      <input type="text" className="form-control" placeholder="First name" aria-label="First name" required onChange={(e) =>{
        setFirstName(e.target.value);
      }} />
      <br></br>
      </div>
      <div className="col">
      <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" required onChange={(e) =>{
        setLastName(e.target.value);
      }} />
      </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email Address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" required onChange={(e) =>{
        setEmail(e.target.value);
      }} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputNo" className="form-label">Contact Number</label>
    <input type="text" className="form-control" id="exampleInputContactNo1" placeholder="Mobile Number" required pattern="[0-9]{10}" onChange={(e) =>{
        setContactNumber(e.target.value);
      }}/>
    <small className="text-muted">Please enter a 10-digit mobile number.</small>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress1" placeholder="Address" required onChange={(e) =>{
        setAddress(e.target.value);
      }} />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputStreet1" placeholder="Street/house/apartment etc." required onChange={(e) =>{
        setStreet(e.target.value);
      }} />
  </div>
  <select className="form-select" aria-label="Default select example" required>
    <option selected disabled>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>

  <br></br>
  <div className="text-center">
  <button type="submit" className="btn btn-primary">
          Submit
        </button>
  </div>

</form>
>>>>>>> a5d92b3be39d487aea93ac5d11ca1af1ef1cb4bc

        <br></br>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
    }
  }
