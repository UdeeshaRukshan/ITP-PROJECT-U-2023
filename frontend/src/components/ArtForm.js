import React, { useState } from "react";
import "./ArtForm.css"; // Import CSS file for styling
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

  function sendData(e){
    e.preventDefault();

    if (images.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const newArt= {

      title,
      medium,
      height,
      width,
      condition,
      location,
      value,
      images,

    }

    axios.post("http://localhost:8070/art/addart", newArt).then(() =>{
      alert("Your Art Added");
      setTitle("");
      setMedium("");
      setHeight("");
      setWidth("");
      setCondition("");
      setLocation("");
      setValue("");
      setImages("");
      
    }).catch((err)=>{
      alert(err);
    });

  }

  function handleImageChange(e) {
    const selectedImages = e.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      imageArray.push(URL.createObjectURL(selectedImages[i]));
    }

    setImages(imageArray);
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
      <h2>Tell Us About Your Art</h2>
        <label htmlFor="title">Title:</label>
        <textarea
          id="title"
          name="title"
          placeholder="e.g., Starry night by vincent van gogh"
          required
          onChange={(e) =>{
            setTitle(e.target.value);
          }}></textarea><br />

        <label htmlFor="medium">Medium:</label>
        <input
          type="text"
          id="medium"
          name="medium"
          placeholder="e.g., canvas,wood,clay,paint etc."
          required
          onChange={(e) =>{
            setMedium(e.target.value);
          }}/><br />

        <div className="row">
          <div className="col">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="e.g., 120"
              required
              onChange={(e) =>{
                const inputHeight = e.target.value;
               if (inputHeight > 0) {
                setHeight(inputHeight);
                } else {
                alert("Must enter valid height");
                }
              }}/>
          </div>
          <div className="col">
            <label htmlFor="width">Width (cm):</label>
            <input
              type="number"
              id="width"
              name="width"
              placeholder="e.g., 145"
              required
              onChange={(e) =>{
                const inputWidth = e.target.value;
               if (inputWidth > 0) {
                setWidth(inputWidth);
                } else {
                alert("Must enter valid width");
                }
              }}/>
          </div>
        </div>

        <label htmlFor="condition">Describe the condition of the art:</label>
        <textarea
          id="condition"
          name="condition"
          placeholder="e.g., Minor crease at lower left corner"
          required
          onChange={(e) =>{
            setCondition(e.target.value);
          }}></textarea><br />

        <label htmlFor="Location">Location:</label>
        <select class="form-select"
          id="location"
          name="location"
          required
          onChange={(e) =>{
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
        </select><br />

        <label htmlFor="openingValue">Give a opening value to auction your art:($)</label>
        <input
          type="number"
          id="openingValue"
          name="openingValue"
          placeholder="e.g., 120"
          required
          onChange={(e) =>{
            const inputOpeningValue = e.target.value;
               if (inputOpeningValue > 0) {
                setValue(inputOpeningValue);
                } else {
                alert("Must enter valid value");
                }
          }}/><br />

        <label htmlFor="images">Images (up to 10):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        /><br />

        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            {images.map((image, index) => (
              <img key={index}
              className="image-preview" 
              src={image} 
              alt={`Image ${index}`} />
            ))}
          </div>
        )}

         <button type="submit">Submit</button>
         
      </form>
    </div>
  );
}

export default ArtForm;
