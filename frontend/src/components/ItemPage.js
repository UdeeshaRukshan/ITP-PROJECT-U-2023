import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function ItemPage() {
  const navigate = useNavigate(); // Use useNavigate

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleAddItem = () => {
    // Use navigate function to programmatically navigate
    axios
      .post("http://localhost:4042/api/wishlist/create", newItem) // Make sure this route matches your backend route
      .then(() => {
        navigate("/wishlist"); // Navigate to the wishlist page
      })
      .catch((error) => {
        console.error("Error adding wishlist item:", error);
      });
  };
  const handleChange = (e) => {
    // Update the newItem state when input fields change
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Item Page</h1>
      {/* Item page UI */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newItem.price}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleAddItem}>Add to Wishlist</button>
    </div>
  );
}

export default ItemPage;
