import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './EditArtForm.css';

export default function EditArtForm() {
  const { artid } = useParams(); 
  const [updatedArt, setUpdatedArt] = useState({});
  const [formErrors, setFormErrors] = useState({
    title: "",
    medium: "",
    height: "",
    width: "",
    condition: "",
    location: "",
    value: "",
  });

  useEffect(() => {
   
    async function fetchArtData() {
      try {
        const response = await axios.get(`http://localhost:8070/art/getarts/${artid}`);
        setUpdatedArt(response.data.Art);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArtData();
  }, [artid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedArt({ ...updatedArt, [name]: value });

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
   
    switch (fieldName) {
      case "title":
        if (/\d/.test(value)) {
          setFormErrors({ ...formErrors, title: "Title cannot contain numerical characters." });
        } else {
          setFormErrors({ ...formErrors, title: "" });
        }
        break;
      case "medium":
        if (/\d/.test(value)) {
          setFormErrors({ ...formErrors, medium: "Medium cannot contain numerical characters." });
        } else {
          setFormErrors({ ...formErrors, medium: "" });
          
        }
        break;
      case "height":
        if (value <= 0) {
          setFormErrors({ ...formErrors, height: "Height must be a positive number." });
        } else {
          setFormErrors({ ...formErrors, height: "" });
        }
        break;
      case "width":
        if (value <= 0) {
          setFormErrors({ ...formErrors, width: "Width must be a positive number." });
        } else {
          setFormErrors({ ...formErrors, width: "" });
        }
        break;
      case "value":
        if (value <= 0) {
          setFormErrors({ ...formErrors, value: "Value must be a meaningful number." });
        } else {
          setFormErrors({ ...formErrors, value: "" });
        }
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const key in formErrors) {
      if (formErrors[key]) {
        alert("Please fix the validation errors before submitting.");
        return;
      }
    }

    try {
      await axios.put(`http://localhost:8070/art/updateart/${artid}`, updatedArt);
      window.location.href = '/getarts'; 
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    window.location.href = '/getarts'; 
  };

  return (
    <div className="edit-art-form-container">
      <h2 className="edit-art-form-title">Edit Art</h2>
      <form onSubmit={handleSubmit}>
        <label className="edit-art-form-label">
          Title:
          <textarea
            name="title"
            className="edit-art-form-textarea"
            placeholder="e.g., Starry night by Vincent van Gogh"
            required
            value={updatedArt.title}
            onChange={handleInputChange}
          />
           {formErrors.title && <p className="edit-art-error-message">{formErrors.title}</p>}
        </label>
        <label className="edit-art-form-label">
          Medium:
          <input
            type="text"
            name="medium"
            className="edit-art-form-input"
            placeholder="e.g., canvas, wood, clay, paint, etc."
            required
            value={updatedArt.medium}
            onChange={handleInputChange}
          />
           {formErrors.medium && <p className="edit-art-error-message">{formErrors.medium}</p>}
        </label><br></br>
        <label className="edit-art-form-label">
          Height (cm):
          <input
            type="number"
            name="height"
            className="edit-art-form-input"
            placeholder="e.g., 120"
            required
            value={updatedArt.height}
            onChange={handleInputChange}
          />
          {formErrors.height && (
              <p className="edit-art-error-message">{formErrors.height}</p>
            )}
        </label><br></br>
        <label className="edit-art-form-label">
          Width (cm):
          <input
            type="number"
            name="width"
            className="edit-art-form-input"
            placeholder="e.g., 145"
            required
            value={updatedArt.width}
            onChange={handleInputChange}
          />
          {formErrors.width && (
              <p className="edit-art-error-message">{formErrors.width}</p>
            )}
        </label>
        <label className="edit-art-form-label">
          Describe the condition of the art:
          <textarea
            name="condition"
            className="edit-art-form-textarea"
            placeholder="e.g., Minor crease at lower left corner"
            required
            value={updatedArt.condition}
            onChange={handleInputChange}
          />
        </label>
        <label className="edit-art-form-label">
          Location:
          <select
            name="location"
            required
            value={updatedArt.location}
            onChange={handleInputChange}
          >
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kaduwela">Kaduwela</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Anuradhapura">Anuradhapura</option>
          </select>
        </label><br></br>
        <label className="edit-art-form-label">
          Value ($):
          <input
            type="number"
            name="value"
            className="edit-art-form-input"
            placeholder="e.g., 120"
            required
            value={updatedArt.value}
            onChange={handleInputChange}
          />
          {formErrors.value && (
              <p className="edit-art-error-message">{formErrors.value}</p>
            )}
        </label><br></br>
        <div className="edit-art-form-button-container">
          <button type="submit" className="edit-art-form-save-button">
            Save
          </button>
          <a href="/getarts" className="edit-art-form-cancel-button">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
