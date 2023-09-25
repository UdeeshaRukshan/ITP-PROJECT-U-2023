import React from 'react';

function Item({ item, onAddToWishlist }) {
  return (
    <div className="item">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <button onClick={() => onAddToWishlist(item)}>Add to Wishlist</button>
    </div>
  );
}

export default Item;
