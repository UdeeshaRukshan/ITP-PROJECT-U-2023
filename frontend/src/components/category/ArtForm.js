import React, { useState, useRef } from "react";
import "./ArtForm.css"; 
import axios from "axios";

function ArtForm() {
  const [title, setTitle] = useState("");

  const [medium, setMedium] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");
  const [images, setImages] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: "",
    medium: "",
    height: "",
    width: "",
    condition: "",
    location: "",
    value: "",
    images: "",
  });

  function sendData(e) {
    e.preventDefault();

    const newArt = {
      title,
      medium,
      height,
      width,
      condition,
      location,
      value,
      images,
    };

    axios
      .post("http://localhost:4042/art/addart", newArt)
      .then(() => {
        alert("Your Art Added");
        setTitle("");
        setMedium("");
        setHeight("");
        setWidth("");
        setCondition("");
        setLocation("");
        setValue("");
        setImages("");

      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleImageChange(e) {
    const selectedImage = e.target.files[0]; 
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImages([imageURL]);
    }
  }

  return (
    <div className="art-form-container">
      <form onSubmit={sendData}>
        <h2 className="art-form-title">Tell Us About Your Art</h2>
        <label className="art-form-label" htmlFor="title">
          Title:
        </label>
        <textarea
          id="title"
          name="title"
          className="art-form-textarea"
          placeholder="e.g., Starry night by vincent van gogh"
          required
          value={title}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/\d/.test(inputValue)) {
              setFormErrors({
                ...formErrors,
                title: "Title cannot contain numerical characters.",
              });
            } else {
              setFormErrors({ ...formErrors, title: "" });
              setTitle(inputValue);
            }
          }}
        ></textarea>
        <br />
        {formErrors.title && (
          <p className="art-form-error-message">{formErrors.title}</p>
        )}

        <label className="art-form-label" htmlFor="medium">
          Medium:
        </label>
        <input
          type="text"
          id="medium"
          name="medium"
          className="art-form-input"
          placeholder="e.g., canvas,wood,clay,paint etc."
          required
          value={medium}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/\d/.test(inputValue)) {
              setFormErrors({
                ...formErrors,
                medium: "Medium cannot contain numerical characters.",
              });
            } else {
              setFormErrors({ ...formErrors, medium: "" });
              setMedium(inputValue);
            }
          }}
        />
        <br />
        {formErrors.medium && (
          <p className="art-form-error-message">{formErrors.medium}</p>
        )}

        <div className="row">
          <div className="col">
            <label className="art-form-label" htmlFor="height">
              Height (cm):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              className="art-form-input"
              placeholder="e.g., 120"
              required
              value={height}
              onChange={(e) => {
                const inputHeight = e.target.value;
                if (inputHeight > 0) {
                  setFormErrors({ ...formErrors, height: "" });
                  setHeight(inputHeight);
                } else {
                  setFormErrors({
                    ...formErrors,
                    height: "Height must be a positive number.",
                  });
                }
              }}
            />
            {formErrors.height && (
              <p className="art-form-error-message">{formErrors.height}</p>
            )}
          </div>
          <div className="col">
            <label className="art-form-label" htmlFor="width">
              Width (cm):
            </label>
            <input
              type="number"
              id="width"
              name="width"
              className="art-form-input"
              placeholder="e.g., 145"
              required
              value={width}
              onChange={(e) => {
                const inputWidth = e.target.value;
                if (inputWidth > 0) {
                  setFormErrors({ ...formErrors, width: "" });
                  setWidth(inputWidth);
                } else {
                  setFormErrors({
                    ...formErrors,
                    width: "Width must be a positive number.",
                  });
                }
              }}
            />
            {formErrors.width && (
              <p className="art-form-error-message">{formErrors.width}</p>
            )}
          </div>
        </div>

        <label className="art-form-label" htmlFor="condition">
          Describe the condition of your art:
        </label>
        <textarea
          id="condition"
          name="condition"
          className="art-form-textarea"
          placeholder="e.g., Minor crease at lower left corner"
          required
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        ></textarea>
        <br />

        <label className="art-form-label" htmlFor="location">
          Location:
        </label>
        <select
          className="form-select"
          id="location"
          name="location"
          required
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
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
        <br />

        <label className="art-form-label" htmlFor="openingValue">
          Give an opening value to auction your art: ($)
        </label>
        <input
          type="number"
          id="openingValue"
          name="openingValue"
          className="art-form-input"
          placeholder="e.g., 120"
          required
          value={value}
          onChange={(e) => {
            const inputOpeningValue = e.target.value;
            if (inputOpeningValue > 0) {
              setFormErrors({ ...formErrors, value: "" });
              setValue(inputOpeningValue);
            } else {
              setFormErrors({
                ...formErrors,
                value: "Opening value must be a meaningful number.",
              });
            }
          }}
        />
         {formErrors.value && (
          <p className="art-form-error-message">{formErrors.value}</p>
        )}
        <br />

        <label className="art-form-label" htmlFor="images">
          Image:
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          required
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />

        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            {images.map((image, index) => (
              <img
                key={index}
                className="art-form-image-preview"
                src={image}
                alt={`Image ${index}`}
              />
            ))}
          </div>
        )}

        <button type="submit" className="art-form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ArtForm;
