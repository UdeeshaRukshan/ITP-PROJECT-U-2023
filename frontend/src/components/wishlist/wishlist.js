import { useState, useEffect } from "react";
import axios from "axios";
import "../wishlist/wishlist.css";
const Wishlist = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get("/wishlist/display")
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddItem = () => {
    axios
      .post(
        "/wishlist/add",
        { name, description, price },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setWishlist([...wishlist, response.data]);
        setName("");
        setDescription("");
        setPrice("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="App">
      <h1>Wish List</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddItem} className="add-button">
          Add to Wishlist
        </button>
      </div>
      <div>
        <h2>My Wishlist</h2>
        <ul className="wishlist">
          {wishlist.map((item) => (
            <li key={item._id} className="wishlist-item">
              {item.name} - {item.description} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
