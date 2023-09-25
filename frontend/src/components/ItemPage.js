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
      .post("/api/wishlist", newItem)
      .then(() => {
        navigate("/wishlist"); // Navigate to the wishlist page
      })
      .catch((error) => {
        console.error("Error adding wishlist item:", error);
      });
  };

  return (
    <div>
      <h1>Item Page</h1>
      {/* Item page UI */}
      <button onClick={handleAddItem}>Add to Wishlist</button>
    </div>
  );
}

export default ItemPage;
