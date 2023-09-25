// client/src/App.js
import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import Wishlist from './components/Wishlist';
import axios from 'axios'; // You need to install axios: npm install axios

function App() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  const userId = 'replace_with_actual_user_id'; // Replace with the actual user ID

  // Fetch items from the server when the component mounts
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get('/api/items'); // Assuming your server is running on the same domain
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  // Fetch wishlist when the component mounts
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await axios.get(`/api/wishlist/${userId}`);
        setWishlist(response.data.items);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    fetchWishlist();
  }, [userId]); // Use userId as a dependency

  // Handle adding an item to the wishlist
  const addToWishlist = async (itemId) => {
    try {
      await axios.post(`/api/wishlist/${userId}`, { itemId });
      // Refetch wishlist to update the UI
      const response = await axios.get(`/api/wishlist/${userId}`);
      setWishlist(response.data.items);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  return (
    <div className="App">
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Item item={item} addToWishlist={addToWishlist} />
          </li>
        ))}
      </ul>

      <h1>Wishlist</h1>
      <Wishlist wishlist={wishlist} />
    </div>
  );
}

export default App;
