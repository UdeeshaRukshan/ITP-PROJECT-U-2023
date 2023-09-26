import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get('/api/wishlist').then((response) => {
      setWishlist(response.data);
    });
  }, []);

  const handleRemoveItem = (itemId) => {
    axios.delete(`/api/wishlist/${itemId}`).then(() => {
      setWishlist(wishlist.filter((item) => item._id !== itemId));
    });
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
