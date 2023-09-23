import React, { useState } from "react";
import "../App.css";
export default function PersonalDetails() {


  return (
    <div className="container">
      <form>
  <div class="row">
    <label for="exampleInputName" class="form-label">Full Name</label>
    <div class="col">
      <input type="text" class="form-control" placeholder="First name" aria-label="First name" required />
      <br></br>
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" required />
    </div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail" class="form-label">Email Address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" required />
  </div>
  <div class="mb-3">
    <label for="exampleInputNo" class="form-label">Contact Number</label>
    <input type="text" class="form-control" id="exampleInputContactNo1" placeholder="Mobile Number" required pattern="[0-9]{10}" />
    <small class="text-muted">Please enter a 10-digit mobile number.</small>
  </div>
  <div class="mb-3">
    <label for="exampleInputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="exampleInputAddress1" placeholder="Address" required />
  </div>
  <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputStreet1" placeholder="Street/house/apartment etc." required />
  </div>
  <select class="form-select" aria-label="Default select example" required>
    <option selected disabled>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>

  <br></br>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  );
    }
  
