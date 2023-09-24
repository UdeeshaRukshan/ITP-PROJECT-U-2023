import React, { useState } from "react";
import "./ArtForm.css"; // Import your CSS file for styling

function ArtForm() {
  const [artData, setArtData] = useState({
    title: "",
    medium: "",
    height: "",
    width: "",
    condition: "",
    location: "",
    openingValue: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input for images
    if (type === "file") {
      const selectedImages = Array.from(e.target.files);
      setArtData({
        ...artData,
        images: selectedImages,
      });
    } else {
      setArtData({
        ...artData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, such as sending data to a server.
    console.log("Art data:", artData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <h2>Add a New Artwork</h2>
        <label htmlFor="title">Title:</label>
        <textarea
          id="title"
          name="title"
          value={artData.title}
          onChange={handleChange}
          placeholder="Title/or subject"
          required
        ></textarea><br />

        <label htmlFor="medium">Medium:</label>
        <input
          type="text"
          id="medium"
          name="medium"
          value={artData.medium}
          onChange={handleChange}
          placeholder="e.g., canvas,wood,clay,paint etc."
          required
        /><br />

        <div className="row">
          <div className="col">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={artData.height}
              onChange={handleChange}
              placeholder="e.g., 120"
              required
            />
          </div>
          <div className="col">
            <label htmlFor="width">Width (cm):</label>
            <input
              type="number"
              id="width"
              name="width"
              value={artData.width}
              onChange={handleChange}
              placeholder="e.g., 145"
              required
            />
          </div>
        </div>

        <label htmlFor="condition">Describe the condition of the art:</label>
        <textarea
          id="condition"
          name="condition"
          value={artData.condition}
          onChange={handleChange}
          placeholder="e.g., Minor crease at lower left corner"
          required
        ></textarea><br />

        <label htmlFor="location">Where is this art located:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={artData.location}
          onChange={handleChange}
          placeholder="e.g., Kurunegala"
          required
        /><br />

        <label htmlFor="openingValue">Opening Value (Rs):</label>
        <input
          type="number"
          id="openingValue"
          name="openingValue"
          value={artData.openingValue}
          onChange={handleChange}
          placeholder="e.g., 12 000"
          required
        /><br />

        <label htmlFor="images">Images (multiple):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          required
        /><br />

         <div className="row justify-content-center">
          {/* Center the buttons within a row */}
          <div className="col-auto">
            <button type="button" className="btn btn-secondary btn-lg">Back</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArtForm;
