import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paymentForm.css";
import axios from "axios";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate()
  const [saveCardDetails, setSaveCardDetails] = useState(false); // State for the checkbox

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setSaveCardDetails(!saveCardDetails); // Toggle the checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Axios to send the POST request
      const response = await axios.post(
        "http://localhost:8070/payment/addpayment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Payment data saved successfully
        console.log("Payment data saved successfully");
      } else {
        console.error("Error saving payment data");
      }
    } catch (error) {
      console.error("Error saving payment data:", error);
    }
  };

  const main = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    handleSubmit(e); // Pass the event object to handleChange
    navigate('/review');
  }

  return (
    <div className="payment-form">
      <h2>Checkout</h2>
      <div className="subheading">Personal Information</div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="input-field"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="input-field"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="subheading">
              Payment Information
        </div>
        <div className="row">
          <div className="form-group">
            <input
              type="text"
              className="input-field card-field"
              name="cardName"
              placeholder="Card Name"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field card-field"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <input
              type="text"
              className="input-field date-field"
              name="expiryDate"
              placeholder="Expiry Date"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="input-field cvv-field"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
          <label className="label">
            <input
              type="checkbox"
              name="saveCardDetails"
              checked={saveCardDetails}
              onChange={handleCheckboxChange}
            />{" "}
            Save the card details
          </label>
        </div>
        </div>
        <button className="checkout-button" type="submit" onClick= {main}>  
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
//{() => navigate('/review')}>