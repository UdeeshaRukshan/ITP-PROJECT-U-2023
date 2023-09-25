import React, { useState } from "react";
import "./ArtForm.css"; // Import your CSS file for styling
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
      alert("Art Added");
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

  return (
    <div className="container">
      <form onSubmit={sendData}>
      <h2>Add a New Artwork</h2>
        <label htmlFor="title">Title:</label>
        <textarea
          id="title"
          name="title"
          placeholder="Title/or subject"
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
                setHeight(e.target.value);
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
                setWidth(e.target.value);
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

        <label htmlFor="location">Where is this art located:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g., Kurunegala"
          required
          onChange={(e) =>{
            setLocation(e.target.value);
          }}/><br />

        <label htmlFor="openingValue">Opening Value (Rs):</label>
        <input
          type="number"
          id="openingValue"
          name="openingValue"
          placeholder="e.g., 12 000"
          required
          onChange={(e) =>{
            setValue(e.target.value);
          }}/><br />

        <label htmlFor="images">Images (multiple):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          required
          onChange={(e) =>{
            setImages(e.target.value);
          }}/><br />

         <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ArtForm;
