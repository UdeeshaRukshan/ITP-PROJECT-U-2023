// frontend/src/components/ItemPage.js

import React, { useState } from 'react';
import { useHistory } from 'react-router'; // Import useHistory from 'react-router'
import axios from 'axios';

function ItemPage() {
  const history = useHistory(); // Use useHistory hook
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });

  const handleAddItem = () => {
    axios.post('/api/wishlist', newItem)
      .then(() => {
        history.push('/wishlist'); // Navigate to the wishlist page
      })
      .catch((error) => {
        console.error('Error adding wishlist item:', error);
      });
  }

  return (
    <div>
      <h1>Item Page</h1>
      {/* Item page UI */}
      <button onClick={handleAddItem}>Add to Wishlist</button>
    </div>
  );
}

export default ItemPage;
