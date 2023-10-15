import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentForm.css";
import axios from "axios";

const PaymentForm = () => {
  const [saveCardDetails, setSaveCardDetails] = useState(false);

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

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    phone: "",
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      let cleanedValue = value;

      // Handle special formatting for expiryDate
      if (name === "expiryDate") {
        cleanedValue = cleanedValue.replace(/\D/g, "");

        if (cleanedValue.length >= 2) {
          cleanedValue = cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2);
        }

        setErrorMessages({
          ...errorMessages,
          expiryDate: isExpiryDateValid(cleanedValue)
            ? ""
            : "Card has already expired",
        });
      }

      setFormData({
        ...formData,
        [name]: cleanedValue,
      });

      // Validate and set error messages for other fields
      setErrorMessages({
        ...errorMessages,
        email:
          name === "email"
            ? isEmailValid(cleanedValue)
              ? ""
              : "Please enter a valid email address"
            : errorMessages.email,
        phone:
          name === "phone"
            ? isPhoneNumberValid(cleanedValue)
              ? ""
              : "Please enter a valid phone number"
            : errorMessages.phone,
        cardNumber:
          name === "cardNumber"
            ? isCardNumberValid(cleanedValue)
              ? ""
              : "Please enter a valid 16-digit card number"
            : errorMessages.cardNumber,
        cvv:
          name === "cvv"
            ? isCVVValid(cleanedValue)
              ? ""
              : "Please enter a valid 3-digit CVV"
            : errorMessages.cvv,
        expiryDate:
          name === "expiryDate"
            ? isExpiryDateValid(cleanedValue)
              ? ""
              : "Card has already expired"
            : errorMessages.expiryDate,
      });
    }
  };

  // Function to save card details
  const saveCardDetailsFunction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4042/payment/addpayment",
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
        if (saveCardDetails) {
          // Only save card details if the checkbox is checked
          await axios.post(
            "http://localhost:4042/payment/addpayment",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        navigate("/review");
      } catch (error) {
        console.error("Error saving payment data:", error);
      }
    } else {
      alert("Form data is not valid. Please check your inputs.");
    }
  };

  return (
    <div className="payment-form" style={{ marginTop: "10vh" }}>
      <h2 className="paymentform-head">Checkout</h2>
      <div className="form-subheading">Personal Information</div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group-payment">
          <input
            type="text"
            className="input-field-pay"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-payment">
          <input
            type="email"
            className="input-field-pay"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errorMessages.email && (
            <div className="error-message">{errorMessages.email}</div>
          )}
        </div>
        <div className="form-group-payment">
          <input
            type="tel"
            className="input-field-pay"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errorMessages.phone && (
            <div className="error-message">{errorMessages.phone}</div>
          )}
        </div>
        <div className="form-subheading">Payment Information</div>
        <div className="row">
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay card-field"
              name="cardName"
              placeholder="Card Name"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay card-field"
              name="cardNumber"
              placeholder="Card Number"
              value={formatCardNumber(formData.cardNumber)}
              onChange={handleChange}
            />
            {errorMessages.cardNumber && (
              <div className="error-message">{errorMessages.cardNumber}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay date-field"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            {errorMessages.expiryDate && (
              <div className="error-message">{errorMessages.expiryDate}</div>
            )}
          </div>
          <div className="form-group-payment">
            <input
              type="text"
              className="input-field-pay cvv-field"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
            />
            {errorMessages.cvv && (
              <div className="error-message">{errorMessages.cvv}</div>
            )}
          </div>
        </div>
        <div className="form-group-payment radio-group">
          <p>Do you want to save your card details?</p>
          <div>
            <input
              type="radio"
              id="saveCardDetailsYes"
              name="saveCardDetails"
              value="yes"
              checked={saveCardDetails === true}
              onChange={() => setSaveCardDetails(true)}
            />
            <div className="pay-radio-button-container">
              <label htmlFor="saveCardDetailsYes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="saveCardDetailsNo"
                name="saveCardDetails"
                value="no"
                checked={saveCardDetails === false}
                onChange={() => setSaveCardDetails(false)}
              />
              <label htmlFor="saveCardDetailsNo">No</label>
            </div>
          </div>
        </div>
        <button
          className="checkout-button"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
