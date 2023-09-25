import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './components/Item';
import Wishlist from './components/Wishlist';


function App() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userId] = useState('replace_with_actual_user_id');

  useEffect(() => {
    // Fetch items from the server
    axios.get('/api/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    // Fetch user's wishlist from the server based on userId
    axios.get(`/api/wishlist/${userId}`)
      .then((response) => {
        setWishlist(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
      });
  }, [userId]);

  // Function to add an item to the wishlist
  const addToWishlist = (item) => {
    axios.post(`/api/wishlist/${userId}`, { itemId: item._id })
      .then((response) => {
        setWishlist(response.data.items);
      })
      .catch((error) => {
        console.error('Error adding item to wishlist:', error);
      });
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (item) => {
    axios.delete(`/api/wishlist/${userId}/${item._id}`)
      .then((response) => {
        setWishlist(response.data.items);
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
      });
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <div className="item-list">
        {items.map((item) => (
          <Item key={item._id} item={item} onAddToWishlist={addToWishlist} />
        ))}
      </div>

      <Wishlist wishlist={wishlist} onRemoveFromWishlist={removeFromWishlist} />
    </div>
  );
}

export default App;
