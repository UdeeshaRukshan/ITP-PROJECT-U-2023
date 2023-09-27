import React, { useState } from "react";
import axios from "axios";
import "./Collectable.css";

function CollectableForm() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
   
  function sendData(e) {
    e.preventDefault();

    const newCollectable= {
      type,
      name,
      value,
      description,
      images,
    }

    axios.post("http://localhost:8070/collectable/addcollectable", newCollectable).then(() =>{
      alert("Collectable Added");
      setType("");
      setName("");
      setValue("");
      setDescription("");
      setImages("");
      
    }).catch((err) =>{
      alert(err);
    });
    
  }
 
  return (
    <div className="container">
      <form onSubmit={sendData}>
      <h2>Tell Us About Your Item</h2>
      <select class="form-select" aria-label="Default select example" required
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

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g., Desert Flower Novel."        
          required
          onChange={(e) =>{
            setName(e.target.value);
          }}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="e.g.,Used book,Only two pages are torn but readable."
          required
          onChange={(e) =>{
            setDescription(e.target.value);
          }}
        ></textarea>

        <label htmlFor="openingValue">Give a opening value to auction your item:($)</label>
        <input
          type="number"
          id="openingValue"
          name="openingValue"
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

<label htmlFor="image">Images: </label>
        <input type="file" id="images" name="images" accept="image/*" multiple required
        onChange={(e) =>{
          setImages(e.target.value);
        }}/><br></br>
              

              <button type="submit">Submit</button>
              
        </form>
    </div>
  );
}

export default CollectableForm;
