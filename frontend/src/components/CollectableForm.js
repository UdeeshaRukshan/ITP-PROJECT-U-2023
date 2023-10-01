import React, { useState } from "react";
import axios from "axios";
import "./CollectableForm.css";


function CollectableForm() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
   
  function sendData(e) {
    e.preventDefault();

    if (images.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const newCollectable= {
      type,
      name,
      value,
      description,
      images,
    }

    axios.post("http://localhost:8070/collectable/addcollectable", newCollectable).then(() =>{
      alert("Your Item Added");
      setType("");
      setName("");
      setValue("");
      setDescription("");
      setImages("");
      
    }).catch((err) =>{
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
    <div className="collectable-form-container">
      <form onSubmit={sendData}>
      <h2 className="collectable-form-title">Tell Us About Your Item</h2>
      <label className="collectable-form-label" htmlFor="type">Type:</label>
      <select className="collectable-form-select" aria-label="Default select example" required
      onChange={(e) =>{
        setType(e.target.value);
      }}>
         <option selected disabled>Type</option>
         <option value="Furniture">Furniture</option>
         <option value="Antique">Antique</option>
         <option value="Books">Books</option>
         <option value="Jewelry">Jewelry</option>
         <option value="Toys">Toys</option>
         <option value="Other">Other</option>
      </select>

        <label className="collectable-form-label" htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="collectable-form-input"
          placeholder="e.g., Desert Flower Novel."        
          required
          onChange={(e) =>{
            setName(e.target.value);
          }}
        />

        <label className="collectable-form-label" htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="collectable-form-textarea"
          placeholder="e.g.,Used book,Only two pages are torn but readable."
          required
          onChange={(e) =>{
            setDescription(e.target.value);
          }}
        ></textarea>

        <label className="collectable-form-label" htmlFor="openingValue">Give a opening value to auction your item:($)</label>
        <input
          type="number"
          id="openingValue"
          className="collectable-form-input"
          placeholder="e.g., 15"
          required
          onChange={(e) =>{
            const inputOpeningValue = e.target.value;
               if (inputOpeningValue > 0) {
                setValue(inputOpeningValue);
                } else {
                alert("Must enter valid value");
                }
          }}
        />

         <label className="collectable-form-label" htmlFor="images">Images (up to 10):</label>
         <input
          type="file"
          id="images"
          name="images"
          multiple
          required
          accept="image/*"
          onChange={handleImageChange}
        /><br />

        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            {images.map((image, index) => (
              <img key={index}
              className="collectable-form-image-preview" 
              src={image} 
              alt={`Image ${index}`} />
            ))}
          </div>
        )}
              

        <button type="submit" className="collectable-form-button">
          Submit
        </button>
              
        </form>
    </div>
  );
}

export default CollectableForm;