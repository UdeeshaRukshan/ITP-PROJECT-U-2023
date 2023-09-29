import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../payment/paymentForm.css";
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

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isCardNumberValid = (cardNumber) => {
    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, "");
    const cardNumberRegex = /^\d{16}$/;
    return cardNumberRegex.test(cardNumberWithoutSpaces);
  };

  const formatCardNumber = (cardNumber) => {
    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, "");
    const formattedCardNumber = cardNumberWithoutSpaces.replace(
      /(.{4})/g,
      "$1 "
    );
    return formattedCardNumber.trim();
  };

  const isExpiryDateValid = (expiryDate) => {
    // Check if the input matches the MM/YY format
    const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!datePattern.test(expiryDate)) {
      return false; // Invalid format
    }

    const [expMonth, expYear] = expiryDate
      .split("/")
      .map((val) => parseInt(val));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    // Check if the card is expired
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false; // Card has already expired
    }

    return true; // Valid date
  };

  const isCVVValid = (cvv) => {
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is the "expiryDate" field
    if (name === "expiryDate") {
      // Ensure only numbers are entered
      const cleanedValue = value.replace(/\D/g, "");

      if (cleanedValue.length <= 4) {
        let formattedValue = cleanedValue;
        if (cleanedValue.length >= 2) {
          // Add a "/" after the first 2 digits (MM)
          formattedValue =
            cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2);
        }

        setFormData({
          ...formData,
          [name]: formattedValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isEmailValid(formData.email) &&
      isPhoneNumberValid(formData.phone) &&
      isCardNumberValid(formData.cardNumber) &&
      isExpiryDateValid(formData.expiryDate) &&
      isCVVValid(formData.cvv)
    ) {
      try {
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
          console.log("Payment data saved successfully");
          navigate("/review");
        } else {
          console.error("Error saving payment data");
        }
      } catch (error) {
        console.error("Error saving payment data:", error);
      }
    } else {
      console.error("Form data is not valid. Please check your inputs.");
    }
  };

  const main = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    handleSubmit(e); // Pass the event object to handleChange
    navigate(`/review`);
  };

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
          {!isEmailValid(formData.email) && (
            <div className="error-message">
              Please enter a valid email address
            </div>
          )}
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
          {!isPhoneNumberValid(formData.phone) && (
            <div className="error-message">
              Please enter a valid phone number
            </div>
          )}
        </div>
        <div className="subheading">Payment Information</div>
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
              value={formatCardNumber(formData.cardNumber)}
              onChange={handleChange}
            />
            {!isCardNumberValid(formData.cardNumber) && (
              <div className="error-message">
                Please enter a valid 16-digit card number
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <input
              type="text"
              className="input-field date-field"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            {!isExpiryDateValid(formData.expiryDate) && (
              <div className="error-message">Card has already expired</div>
            )}
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
            {!isCVVValid(formData.cvv) && (
              <div className="error-message">
                Please enter a valid 3-digit CVV
              </div>
            )}
          </div>
        </div>
        <button className="checkout-button" type="submit" onClick={main}>
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
