import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditCollecForm.css";

export default function EditCollectableForm() {
  const { collectableid } = useParams();
  const [updatedCollectable, setUpdatedCollectable] = useState({});
  const [formErrors, setFormErrors] = useState({
    type: "",
    name: "",
    value: "",
    description: "",
  });

  useEffect(() => {
    async function fetchArtData() {
      try {
        const response = await axios.get(
          `http://localhost:4042/collectable/getcollectables/${collectableid}`
        );
        setUpdatedCollectable(response.data.Collectable);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArtData();
  }, [collectableid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCollectable({ ...updatedCollectable, [name]: value });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (/\d/.test(value)) {
          setFormErrors({
            ...formErrors,
            name: "Name cannot contain numerical characters.",
          });
        } else {
          setFormErrors({ ...formErrors, name: "" });
        }
        break;
      case "value":
        if (value <= 0) {
          setFormErrors({
            ...formErrors,
            value: "Value must be a meaningful number.",
          });
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
      await axios.put(
        `http://localhost:4042/collectable/updatecollectable/${collectableid}`,
        updatedCollectable
      );
      window.location.href = "/getcollectables";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    window.location.href = "/getcollectables";
  };

  return (
    <div
      className="edit-collectable-form-container"
      style={{ marginTop: "15vh" }}
    >
      <h2 className="edit-collectable-form-title">Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <label className="edit-collectable-form-label" htmlFor="type">
          Type:
        </label>
        <select
          className="edit-collectable-form-select"
          aria-label="Default select example"
          required
          name="type"
          value={updatedCollectable.type}
          onChange={handleInputChange}
        >
          <option value="">Type</option>
          <option value="Furniture">Furniture</option>
          <option value="Antique">Antique</option>
          <option value="Books">Books</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Toys">Toys</option>
          <option value="Other">Other</option>
        </select>

        <label className="edit-collectable-form-label" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="edit-collectable-form-input"
          placeholder="e.g., Desert Flower Novel."
          required
          name="name"
          value={updatedCollectable.name}
          onChange={handleInputChange}
        />
        {formErrors.name && (
          <p className="edit-collectable-form-error-message">
            {formErrors.name}
          </p>
        )}

        <label className="edit-collectable-form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          className="edit-collectable-form-textarea"
          placeholder="e.g., Used book, Only two pages are torn but readable."
          required
          name="description"
          value={updatedCollectable.description}
          onChange={handleInputChange}
        ></textarea>

        <label className="edit-collectable-form-label" htmlFor="openingValue">
          Give an opening value to auction your item: ($)
        </label>
        <input
          type="number"
          id="openingValue"
          className="edit-collectable-form-input"
          placeholder="e.g., 15"
          required
          name="value"
          value={updatedCollectable.value}
          onChange={handleInputChange}
        />
        {formErrors.value && (
          <p className="edit-collectable-form-error-message">
            {formErrors.value}
          </p>
        )}
        <br />
        <br></br>
        <div className="edit-collectable-form-button-container">
          <button type="submit" className="edit-collectable-form-save-button">
            Save
          </button>
          <a
            href="/getcollectables/update"
            className="edit-collectable-form-cancel-button"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
