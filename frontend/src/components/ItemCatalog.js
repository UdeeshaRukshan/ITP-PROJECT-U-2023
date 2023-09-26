import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCatalog = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('/api/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleAddItem = () => {
    axios.post('/api/items', newItem).then((response) => {
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '' });
    });
  };

  return (
    <div>
      <h1>Item Catalog</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default ItemCatalog;
